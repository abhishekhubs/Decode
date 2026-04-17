// VoiceMap — Danger Score Gauge (SVG-based, pixel-perfect on web + native)
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Palette } from '@/constants/theme';
import { getDangerLevel } from '@/utils/scoring';

interface Props {
  score: number; // 0–100
  size?: number;
}

function scoreToColor(score: number): string {
  if (score >= 70) return Palette.danger;
  if (score >= 40) return Palette.warning;
  return Palette.success;
}

function scoreToGradient(score: number): [string, string] {
  if (score >= 70) return ['#FF6B6B', '#EF4444'];
  if (score >= 40) return ['#FCD34D', '#F59E0B'];
  return ['#6EE7B7', '#10B981'];
}

// Polar to cartesian for arc path
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Build SVG arc path string for a semi-circle gauge
// startAngle=-210 endAngle=30 gives a 240° sweep centered on bottom
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export function DangerScoreGauge({ score, size = 240 }: Props) {
  const animScore = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = React.useState(0);
  const level = getDangerLevel(score);
  const color = scoreToColor(score);
  const [gradStart, gradEnd] = scoreToGradient(score);

  useEffect(() => {
    Animated.timing(animScore, {
      toValue: score,
      duration: 1600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const listener = animScore.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });
    return () => animScore.removeListener(listener);
  }, [score]);

  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 16;
  const radius = (size - strokeWidth * 2 - 8) / 2;

  // 240° sweep: from -120° to 120° (centered around the top, starting bottom-left)
  const START_ANGLE = -120;
  const END_ANGLE = 120;
  const SWEEP = END_ANGLE - START_ANGLE; // 240°

  const bgPath = describeArc(cx, cy, radius, START_ANGLE, END_ANGLE);

  // Fill arc based on score
  const fillAngle = START_ANGLE + (score / 100) * SWEEP;
  const fillPath = score > 0 ? describeArc(cx, cy, radius, START_ANGLE, fillAngle) : '';

  // Animated fill for SVG (we drive it via JS)
  const [animFillAngle, setAnimFillAngle] = React.useState(START_ANGLE);
  useEffect(() => {
    const target = START_ANGLE + (score / 100) * SWEEP;
    let start: number | null = null;
    const duration = 1600;
    const initial = animFillAngle;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setAnimFillAngle(initial + (target - initial) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  const animatedFillPath = animFillAngle > START_ANGLE
    ? describeArc(cx, cy, radius, START_ANGLE, animFillAngle)
    : '';

  // Dot at fill endpoint
  const dotPos = animFillAngle > START_ANGLE
    ? polarToCartesian(cx, cy, radius, animFillAngle)
    : null;

  return (
    <View style={[styles.wrapper, { width: size, height: size * 0.75 }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradStart} />
            <Stop offset="100%" stopColor={gradEnd} />
          </LinearGradient>
          {/* glow filter not supported in RN SVG, use shadow on the wrapper instead */}
        </Defs>

        {/* Background track */}
        <Path
          d={bgPath}
          fill="none"
          stroke={Palette.navyBorder}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Filled arc */}
        {animatedFillPath ? (
          <Path
            d={animatedFillPath}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ) : null}

        {/* Glow layer (soft, wider stroke behind the fill) */}
        {animatedFillPath ? (
          <Path
            d={animatedFillPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth + 10}
            strokeLinecap="round"
            opacity={0.15}
          />
        ) : null}

        {/* Moving dot at arc tip */}
        {dotPos && (
          <Circle
            cx={dotPos.x}
            cy={dotPos.y}
            r={strokeWidth / 2 + 2}
            fill={color}
            opacity={0.9}
          />
        )}
      </Svg>

      {/* Centre text overlay */}
      <View style={styles.centerText}>
        <Text style={[styles.scoreNumber, { color }]}>{displayScore}</Text>
        <Text style={styles.outOf}>/ 100</Text>
        <View style={[styles.levelBadge, { backgroundColor: color + '28', borderColor: color + '55' }]}>
          <Text style={[styles.levelText, { color }]}>
            {level.emoji} {level.label}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  centerText: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 60,
    fontWeight: '900',
    lineHeight: 64,
    letterSpacing: -3,
  },
  outOf: {
    fontSize: 15,
    color: Palette.grey400,
    marginTop: -4,
    fontWeight: '500',
    letterSpacing: 1,
  },
  levelBadge: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
