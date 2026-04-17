import { Linking, Alert } from 'react-native';

/**
 * Opens WhatsApp with a pre-filled message
 * @param phone Optional phone number (with country code, e.g. +91...)
 * @param message The message to pre-fill
 */
export const sendDirectWhatsApp = (phone: string, message: string) => {
  const url = `whatsapp://send?text=${encodeURIComponent(message)}${phone ? `&phone=${phone}` : ''}`;
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert(
          'WhatsApp Not Installed',
          'Please install WhatsApp to use this feature, or use the Twilio automated alerts in Settings.'
        );
      }
    })
    .catch((err) => {
      console.error('WhatsApp Linking Error:', err);
      Alert.alert('Error', 'Could not open WhatsApp.');
    });
};
