// Auto-generated from app/dataset/data.csv — DO NOT EDIT MANUALLY
import { Review, Alert, PlaybookAction, CompetitorBrand, TrendPoint } from '@/types';

function daysAgo(n: number): string {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
}

export const MOCK_REVIEWS: Review[] = [
  {
    "id": "r001",
    "platform": "flipkart",
    "rating": 5,
    "text": "Excellent phone! Camera quality is top notch 📸 Battery lasts whole day easily",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      },
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      },
      {
        "word": "camera",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R001",
    "likes": 12,
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "id": "r002",
    "platform": "youtube",
    "rating": 4,
    "text": "Phone acha hai but price thoda zyada hai. Camera bahut badhiya hai 👍",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "camera",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R002",
    "likes": 30,
    "createdAt": "2024-01-16T00:00:00.000Z"
  },
  {
    "id": "r003",
    "platform": "twitter",
    "rating": 5,
    "text": "ಬಹಳ ಚೆನ್ನಾಗಿದೆ! Camera super aagide. Battery backup thumba good",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      },
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      },
      {
        "word": "camera",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R003",
    "likes": 12,
    "createdAt": "2024-01-17T00:00:00.000Z"
  },
  {
    "id": "r004",
    "platform": "amazon",
    "rating": 1,
    "text": "worst phone ever!!!!! hangs every 5 minuts. dont buy this peace of junk",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R004",
    "likes": 212,
    "createdAt": "2024-01-18T00:00:00.000Z"
  },
  {
    "id": "r005",
    "platform": "amazon",
    "rating": 2,
    "text": "Heating issue is terrible. Phone becomes like a heater after 10 mins of use 🔥🔥",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R005",
    "likes": 162,
    "createdAt": "2024-02-20T00:00:00.000Z"
  },
  {
    "id": "r006",
    "platform": "flipkart",
    "rating": 2,
    "text": "Heating problem detected within week. Gets too hot during charging and gaming",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R006",
    "likes": 162,
    "createdAt": "2024-02-22T00:00:00.000Z"
  },
  {
    "id": "r007",
    "platform": "youtube",
    "rating": 2,
    "text": "Phone heats up very quickly. Heating issue makes it uncomfortable to hold",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Comfort",
        "sentiment": "negative",
        "confidence": 0.85
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "comfort",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R007",
    "likes": 162,
    "createdAt": "2024-02-25T00:00:00.000Z"
  },
  {
    "id": "r008",
    "platform": "twitter",
    "rating": 2,
    "text": "Overheating is serious concern. Device getting hot even with normal usage",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R008",
    "likes": 162,
    "createdAt": "2024-02-28T00:00:00.000Z"
  },
  {
    "id": "r009",
    "platform": "amazon",
    "rating": 1,
    "text": "Heating problem is unbearable. Phone burns my hand during calls",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R009",
    "likes": 212,
    "createdAt": "2024-03-02T00:00:00.000Z"
  },
  {
    "id": "r010",
    "platform": "amazon",
    "rating": 3,
    "text": "Great phone but heating issue is major drawback. Otherwise perfect",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R010",
    "likes": 75,
    "createdAt": "2024-03-05T00:00:00.000Z"
  },
  {
    "id": "r011",
    "platform": "flipkart",
    "rating": 4,
    "text": "Comfortable shoes 👟 but size runs small. Order one size up!",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R011",
    "likes": 30,
    "createdAt": "2024-01-10T00:00:00.000Z"
  },
  {
    "id": "r012",
    "platform": "youtube",
    "rating": 5,
    "text": "Shoes bahut comfortable hai. Quality bhi acchi hai. Highly recommended!",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R012",
    "likes": 12,
    "createdAt": "2024-01-12T00:00:00.000Z"
  },
  {
    "id": "r013",
    "platform": "twitter",
    "rating": 4,
    "text": "ಚಪ್ಪಲಿ ತುಂಬಾ comfortable aagide but price jasti aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R013",
    "likes": 30,
    "createdAt": "2024-01-13T00:00:00.000Z"
  },
  {
    "id": "r014",
    "platform": "amazon",
    "rating": 1,
    "text": "worst quality fake nike. sole started coming of after 2 days only 😡",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R014",
    "likes": 212,
    "createdAt": "2024-01-14T00:00:00.000Z"
  },
  {
    "id": "r015",
    "platform": "amazon",
    "rating": 5,
    "text": "Amazing shoes! Worth every penny. Quality is superb 💯",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R015",
    "likes": 12,
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "id": "r016",
    "platform": "flipkart",
    "rating": 3,
    "text": "Shoes ache hain lekin delivery time bahut lamba tha. 2 weeks laga",
    "language": "hi",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Delivery",
        "sentiment": "neutral",
        "confidence": 0.79
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "delivery",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R016",
    "likes": 75,
    "createdAt": "2024-01-16T00:00:00.000Z"
  },
  {
    "id": "r017",
    "platform": "youtube",
    "rating": 4,
    "text": "Nice shoes. Comfortable for long walks. Good cushioning support",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R017",
    "likes": 30,
    "createdAt": "2024-01-17T00:00:00.000Z"
  },
  {
    "id": "2024-01-18",
    "platform": "amazon",
    "rating": null,
    "text": "Oh sure",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "2024-01-18",
    "likes": 12,
    "createdAt": "2000-12-31T18:30:00.000Z"
  },
  {
    "id": "r019",
    "platform": "amazon",
    "rating": 5,
    "text": "Shoes super aagide! ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ. Running ke liye perfect hai",
    "language": "mixed",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R019",
    "likes": 12,
    "createdAt": "2024-01-19T00:00:00.000Z"
  },
  {
    "id": "r020",
    "platform": "amazon",
    "rating": 4,
    "text": "good shoes good shoes good shoes good shoes good shoes good shoes",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Nike Air Max Shoes",
    "author": "R020",
    "likes": 30,
    "createdAt": "2024-01-20T00:00:00.000Z"
  },
  {
    "id": "r021",
    "platform": "flipkart",
    "rating": 5,
    "text": "Sound quality is mind blowing 🎵 Bass is heavy and clear. Best in budget!",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R021",
    "likes": 12,
    "createdAt": "2024-01-05T00:00:00.000Z"
  },
  {
    "id": "r022",
    "platform": "youtube",
    "rating": 5,
    "text": "Badhiya hai! Sound quality ekdum mast hai. Paisa vasool product",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R022",
    "likes": 12,
    "createdAt": "2024-01-06T00:00:00.000Z"
  },
  {
    "id": "r023",
    "platform": "twitter",
    "rating": 5,
    "text": "ಸೂಪರ್ product! Bass thumba chennagide. Value for money definitely",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R023",
    "likes": 12,
    "createdAt": "2024-01-07T00:00:00.000Z"
  },
  {
    "id": "r024",
    "platform": "amazon",
    "rating": 1,
    "text": "terable sound quality. cant even here properly. waist of mony",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "negative",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "negative"
      },
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R024",
    "likes": 212,
    "createdAt": "2024-01-08T00:00:00.000Z"
  },
  {
    "id": "r025",
    "platform": "amazon",
    "rating": 2,
    "text": "Connection drops frequently 📱 Very frustrating during calls and music",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R025",
    "likes": 162,
    "createdAt": "2024-01-09T00:00:00.000Z"
  },
  {
    "id": "r026",
    "platform": "flipkart",
    "rating": 2,
    "text": "Battery backup bahut kam hai. Only 2-3 hours chalti hai",
    "language": "hi",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R026",
    "likes": 162,
    "createdAt": "2024-01-10T00:00:00.000Z"
  },
  {
    "id": "r027",
    "platform": "youtube",
    "rating": 5,
    "text": "Great product! Sound quality amazing. Comfortable fit in ears 👂",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R027",
    "likes": 12,
    "createdAt": "2024-01-11T00:00:00.000Z"
  },
  {
    "id": "2024-01-12",
    "platform": "amazon",
    "rating": null,
    "text": "Yeah",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "2024-01-12",
    "likes": 12,
    "createdAt": "2000-12-31T18:30:00.000Z"
  },
  {
    "id": "r029",
    "platform": "amazon",
    "rating": 4,
    "text": "Sound thumba clear aagide. ಬ್ಯಾಟರಿ backup also good. Recommended",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R029",
    "likes": 30,
    "createdAt": "2024-01-13T00:00:00.000Z"
  },
  {
    "id": "r030",
    "platform": "amazon",
    "rating": 5,
    "text": "best product best product best product amazing amazing amazing",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Boat Airdopes 141",
    "author": "R030",
    "likes": 12,
    "createdAt": "2024-01-14T00:00:00.000Z"
  },
  {
    "id": "r031",
    "platform": "flipkart",
    "rating": 5,
    "text": "Works perfectly! Heats up quickly and temperature control is excellent",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R031",
    "likes": 12,
    "createdAt": "2024-01-20T00:00:00.000Z"
  },
  {
    "id": "r032",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut accha hai. Cooking easy ho gaya hai iske saath. Energy saving bhi hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R032",
    "likes": 12,
    "createdAt": "2024-01-21T00:00:00.000Z"
  },
  {
    "id": "r033",
    "platform": "twitter",
    "rating": 5,
    "text": "ತುಂಬಾ useful aagide. Cooking fast aagutte. Easy to clean also",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R033",
    "likes": 12,
    "createdAt": "2024-01-22T00:00:00.000Z"
  },
  {
    "id": "r034",
    "platform": "amazon",
    "rating": 1,
    "text": "not working proparly. makes lot of nois. very bad prodact",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R034",
    "likes": 212,
    "createdAt": "2024-01-23T00:00:00.000Z"
  },
  {
    "id": "r035",
    "platform": "amazon",
    "rating": 3,
    "text": "Good product but gets too hot from bottom. Need to be careful",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R035",
    "likes": 75,
    "createdAt": "2024-01-24T00:00:00.000Z"
  },
  {
    "id": "r036",
    "platform": "flipkart",
    "rating": 4,
    "text": "Achha hai lekin thoda expensive. But quality bahut badhiya hai 👍",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R036",
    "likes": 30,
    "createdAt": "2024-01-25T00:00:00.000Z"
  },
  {
    "id": "r037",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent induction! Energy efficient and cooks food evenly",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R037",
    "likes": 12,
    "createdAt": "2024-01-26T00:00:00.000Z"
  },
  {
    "id": "r038",
    "platform": "twitter",
    "rating": 2,
    "text": "Because spending 5000 rupees to boil water faster is totally necessary 😏",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 73,
    "revenueRisk": 204400,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R038",
    "likes": 182,
    "createdAt": "2024-01-27T00:00:00.000Z"
  },
  {
    "id": "r039",
    "platform": "amazon",
    "rating": 5,
    "text": "Super product! ಬೇಗ heat aagutte. Cooking time save aagutte",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R039",
    "likes": 12,
    "createdAt": "2024-01-28T00:00:00.000Z"
  },
  {
    "id": "r040",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good excellent excellent excellent buy buy buy now now now",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Prestige Induction Cooktop",
    "author": "R040",
    "likes": 12,
    "createdAt": "2024-01-29T00:00:00.000Z"
  },
  {
    "id": "r041",
    "platform": "flipkart",
    "rating": 5,
    "text": "Amazing air fryer! 😍 Food comes out crispy and healthy. No oil needed",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R041",
    "likes": 12,
    "createdAt": "2024-02-01T00:00:00.000Z"
  },
  {
    "id": "r042",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut badhiya hai! Oil free cooking. Health ke liye best hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R042",
    "likes": 12,
    "createdAt": "2024-02-02T00:00:00.000Z"
  },
  {
    "id": "r043",
    "platform": "twitter",
    "rating": 5,
    "text": "Super aagide! ತುಂಬಾ healthy cooking madbahudu. Kids also loves it",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R043",
    "likes": 12,
    "createdAt": "2024-02-03T00:00:00.000Z"
  },
  {
    "id": "r044",
    "platform": "amazon",
    "rating": 1,
    "text": "totaly usless. food not cooked proparly. burnt from outsid raw from insid",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R044",
    "likes": 212,
    "createdAt": "2024-02-04T00:00:00.000Z"
  },
  {
    "id": "r045",
    "platform": "amazon",
    "rating": 3,
    "text": "Good product but capacity is small. Can cook only for 2 people at a time",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R045",
    "likes": 75,
    "createdAt": "2024-02-05T00:00:00.000Z"
  },
  {
    "id": "r046",
    "platform": "flipkart",
    "rating": 4,
    "text": "Air fryer accha hai. Cleaning bhi easy hai. Recommended for health conscious",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R046",
    "likes": 30,
    "createdAt": "2024-02-06T00:00:00.000Z"
  },
  {
    "id": "r047",
    "platform": "youtube",
    "rating": 5,
    "text": "Perfect for small family. Makes delicious crispy food without oil 🍟",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R047",
    "likes": 12,
    "createdAt": "2024-02-07T00:00:00.000Z"
  },
  {
    "id": "2024-02-08",
    "platform": "amazon",
    "rating": null,
    "text": "Oh wonderful",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "2024-02-08",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r049",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba chennaagide! Healthy cooking aagutte. ಎಣ್ಣೆ ಬೇಡ only air enough",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R049",
    "likes": 12,
    "createdAt": "2024-02-09T00:00:00.000Z"
  },
  {
    "id": "r050",
    "platform": "amazon",
    "rating": 5,
    "text": "best best best perfect perfect perfect amazing amazing amazing",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Philips Air Fryer",
    "author": "R050",
    "likes": 12,
    "createdAt": "2024-02-10T00:00:00.000Z"
  },
  {
    "id": "r051",
    "platform": "flipkart",
    "rating": 5,
    "text": "Excellent laptop for daily use! 💻 Fast performance and good battery life",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R051",
    "likes": 12,
    "createdAt": "2024-02-11T00:00:00.000Z"
  },
  {
    "id": "r052",
    "platform": "youtube",
    "rating": 5,
    "text": "Laptop bahut achha hai. Speed bhi fast hai. Office work ke liye perfect",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R052",
    "likes": 12,
    "createdAt": "2024-02-12T00:00:00.000Z"
  },
  {
    "id": "r053",
    "platform": "twitter",
    "rating": 5,
    "text": "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! Fast working aagutte. Battery backup also superb",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R053",
    "likes": 12,
    "createdAt": "2024-02-13T00:00:00.000Z"
  },
  {
    "id": "r054",
    "platform": "amazon",
    "rating": 1,
    "text": "very slow laptop. hangs alot. not worth the prise at all 😡",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Value",
        "sentiment": "negative",
        "confidence": 0.8
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "value",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R054",
    "likes": 212,
    "createdAt": "2024-02-14T00:00:00.000Z"
  },
  {
    "id": "r055",
    "platform": "amazon",
    "rating": 4,
    "text": "Good laptop but keyboard quality could be better. Otherwise satisfied",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R055",
    "likes": 30,
    "createdAt": "2024-02-15T00:00:00.000Z"
  },
  {
    "id": "r056",
    "platform": "flipkart",
    "rating": 3,
    "text": "Laptop theek hai. Screen quality acchi hai. Gaming ke liye not suitable",
    "language": "hi",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "neutral",
        "confidence": 0.82
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R056",
    "likes": 75,
    "createdAt": "2024-02-16T00:00:00.000Z"
  },
  {
    "id": "r057",
    "platform": "youtube",
    "rating": 5,
    "text": "Great performance! Multitasking is smooth. Highly recommended 👍",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R057",
    "likes": 12,
    "createdAt": "2024-02-17T00:00:00.000Z"
  },
  {
    "id": "2024-02-18",
    "platform": "amazon",
    "rating": null,
    "text": "Sure",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "2024-02-18",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r059",
    "platform": "amazon",
    "rating": 5,
    "text": "Laptop super! Work fast aagutte. ಬ್ಯಾಟರಿ long lasting. Value for money",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R059",
    "likes": 12,
    "createdAt": "2024-02-19T00:00:00.000Z"
  },
  {
    "id": "r060",
    "platform": "amazon",
    "rating": 5,
    "text": "excellent excellent excellent buy buy buy good good good laptop laptop",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "HP Pavilion Laptop",
    "author": "R060",
    "likes": 12,
    "createdAt": "2024-02-20T00:00:00.000Z"
  },
  {
    "id": "r061",
    "platform": "flipkart",
    "rating": 5,
    "text": "Comfortable fabric! 👕 Perfect for workouts. Doesn\\'t stick to body during sweat",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R061",
    "likes": 12,
    "createdAt": "2024-02-21T00:00:00.000Z"
  },
  {
    "id": "r062",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut comfortable hai. Fabric quality bhi acchi hai. Gym ke liye best",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R062",
    "likes": 12,
    "createdAt": "2024-02-22T00:00:00.000Z"
  },
  {
    "id": "r063",
    "platform": "twitter",
    "rating": 5,
    "text": "Super comfortable aagide! ಬೆವರು bandaga bega dry aagutte. Good quality",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R063",
    "likes": 12,
    "createdAt": "2024-02-23T00:00:00.000Z"
  },
  {
    "id": "r064",
    "platform": "amazon",
    "rating": 1,
    "text": "fake puma. color faded after 1 wash only. very bad qualitty",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R064",
    "likes": 212,
    "createdAt": "2024-02-24T00:00:00.000Z"
  },
  {
    "id": "r065",
    "platform": "amazon",
    "rating": 4,
    "text": "Good t-shirt but size is slightly smaller than expected. Go for larger size",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R065",
    "likes": 30,
    "createdAt": "2024-02-25T00:00:00.000Z"
  },
  {
    "id": "r066",
    "platform": "flipkart",
    "rating": 4,
    "text": "T-shirt accha hai. Material comfortable hai. Price thoda high hai though",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R066",
    "likes": 30,
    "createdAt": "2024-02-26T00:00:00.000Z"
  },
  {
    "id": "r067",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent quality! Fabric breathes well. Perfect for running 🏃",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R067",
    "likes": 12,
    "createdAt": "2024-02-27T00:00:00.000Z"
  },
  {
    "id": "r068",
    "platform": "twitter",
    "rating": 1,
    "text": "Amazing how a t-shirt can shrink 2 sizes in one wash. Science! 🧪",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 93,
    "revenueRisk": 186000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R068",
    "likes": 232,
    "createdAt": "2024-02-28T00:00:00.000Z"
  },
  {
    "id": "r069",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba comfortable! Running madoke super aagide. ಬಟ್ಟೆ quality good",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R069",
    "likes": 12,
    "createdAt": "2024-02-29T00:00:00.000Z"
  },
  {
    "id": "r070",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good nice nice nice comfort comfort comfort fit fit fit",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Puma Sports T-Shirt",
    "author": "R070",
    "likes": 12,
    "createdAt": "2024-03-01T00:00:00.000Z"
  },
  {
    "id": "r071",
    "platform": "flipkart",
    "rating": 5,
    "text": "Keeps water cold for 24 hours! 💧 No leakage at all. Durable and sturdy",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R071",
    "likes": 12,
    "createdAt": "2024-03-02T00:00:00.000Z"
  },
  {
    "id": "r072",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut accha bottle hai. Paani thanda rehta hai. Travel ke liye perfect",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R072",
    "likes": 12,
    "createdAt": "2024-03-03T00:00:00.000Z"
  },
  {
    "id": "r073",
    "platform": "twitter",
    "rating": 5,
    "text": "ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! Water cold aagutte full day. Strong bottle",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R073",
    "likes": 12,
    "createdAt": "2024-03-04T00:00:00.000Z"
  },
  {
    "id": "r074",
    "platform": "amazon",
    "rating": 1,
    "text": "leakage problam. water came out from cap. very bed quality product",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R074",
    "likes": 212,
    "createdAt": "2024-03-05T00:00:00.000Z"
  },
  {
    "id": "r075",
    "platform": "amazon",
    "rating": 3,
    "text": "Good bottle but cap is difficult to open. Need strong grip to open it",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R075",
    "likes": 75,
    "createdAt": "2024-03-06T00:00:00.000Z"
  },
  {
    "id": "r076",
    "platform": "flipkart",
    "rating": 4,
    "text": "Bottle theek hai. Insulation achha hai. Cleaning thodi difficult hai inside",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R076",
    "likes": 30,
    "createdAt": "2024-03-07T00:00:00.000Z"
  },
  {
    "id": "r077",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent insulation! Water stays cold even in summer heat ☀️",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R077",
    "likes": 12,
    "createdAt": "2024-03-08T00:00:00.000Z"
  },
  {
    "id": "r078",
    "platform": "twitter",
    "rating": 1,
    "text": "Love paying premium price for a bottle that leaks. Best investment ever! 💦",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Value",
        "sentiment": "negative",
        "confidence": 0.8
      }
    ],
    "dangerScore": 93,
    "revenueRisk": 260400,
    "highlights": [
      {
        "word": "value",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R078",
    "likes": 232,
    "createdAt": "2024-03-09T00:00:00.000Z"
  },
  {
    "id": "r079",
    "platform": "amazon",
    "rating": 5,
    "text": "Super bottle! ನೀರು ತಂಪಾಗಿ iratte. Travel time ge thumba useful",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R079",
    "likes": 12,
    "createdAt": "2024-03-10T00:00:00.000Z"
  },
  {
    "id": "r080",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good nice nice nice best best best buy buy buy now now",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Milton Water Bottle",
    "author": "R080",
    "likes": 12,
    "createdAt": "2024-03-11T00:00:00.000Z"
  },
  {
    "id": "r081",
    "platform": "flipkart",
    "rating": 5,
    "text": "Great sound quality! 🎧 Battery life is impressive. Comfortable for long use",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      },
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      },
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R081",
    "likes": 12,
    "createdAt": "2024-03-12T00:00:00.000Z"
  },
  {
    "id": "r082",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut badhiya hai! Sound quality top notch. Gaming ke liye bhi perfect",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R082",
    "likes": 12,
    "createdAt": "2024-03-13T00:00:00.000Z"
  },
  {
    "id": "r083",
    "platform": "twitter",
    "rating": 5,
    "text": "Super product! Sound clear aagide. ಬ್ಯಾಟರಿ thumba time chalatte",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R083",
    "likes": 12,
    "createdAt": "2024-03-14T00:00:00.000Z"
  },
  {
    "id": "r084",
    "platform": "amazon",
    "rating": 1,
    "text": "worst earphones. sound very low. connaction problam always",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "negative",
        "confidence": 0.88
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R084",
    "likes": 212,
    "createdAt": "2024-03-15T00:00:00.000Z"
  },
  {
    "id": "r085",
    "platform": "amazon",
    "rating": 3,
    "text": "Good earphones but magnetic lock is weak. Comes apart easily in bag",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R085",
    "likes": 75,
    "createdAt": "2024-03-16T00:00:00.000Z"
  },
  {
    "id": "r086",
    "platform": "flipkart",
    "rating": 4,
    "text": "Earphones ache hain. Bass quality mast hai. Calling clarity bhi good",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R086",
    "likes": 30,
    "createdAt": "2024-03-17T00:00:00.000Z"
  },
  {
    "id": "r087",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent product! Fast charging and long battery backup 🔋",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R087",
    "likes": 12,
    "createdAt": "2024-03-18T00:00:00.000Z"
  },
  {
    "id": "2024-03-19",
    "platform": "amazon",
    "rating": null,
    "text": "Oh yes",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "2024-03-19",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r089",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba channaagide! Music keloke super. ಬ್ಯಾಟರಿ backup excellent",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R089",
    "likes": 12,
    "createdAt": "2024-03-20T00:00:00.000Z"
  },
  {
    "id": "r090",
    "platform": "amazon",
    "rating": 5,
    "text": "best best best amazing amazing amazing super super super buy buy buy",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "OnePlus Bullets Wireless",
    "author": "R090",
    "likes": 12,
    "createdAt": "2024-03-21T00:00:00.000Z"
  },
  {
    "id": "r091",
    "platform": "flipkart",
    "rating": 5,
    "text": "Perfect running shoes! 👟 Lightweight and excellent grip. Very comfortable",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R091",
    "likes": 12,
    "createdAt": "2024-03-22T00:00:00.000Z"
  },
  {
    "id": "r092",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut comfortable shoes hai. Running ke liye best. Grip bhi achha hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R092",
    "likes": 12,
    "createdAt": "2024-03-23T00:00:00.000Z"
  },
  {
    "id": "r093",
    "platform": "twitter",
    "rating": 5,
    "text": "ತುಂಬಾ comfortable! Running madoke easy aagutte. Lightweight aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R093",
    "likes": 12,
    "createdAt": "2024-03-24T00:00:00.000Z"
  },
  {
    "id": "r094",
    "platform": "amazon",
    "rating": 1,
    "text": "fake adidas. sole started brakng after 1 weak. dont buy this waist",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R094",
    "likes": 212,
    "createdAt": "2024-03-25T00:00:00.000Z"
  },
  {
    "id": "r095",
    "platform": "amazon",
    "rating": 3,
    "text": "Good shoes but price is very high. Could be more affordable",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Value",
        "sentiment": "neutral",
        "confidence": 0.8
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "value",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R095",
    "likes": 75,
    "createdAt": "2024-03-26T00:00:00.000Z"
  },
  {
    "id": "r096",
    "platform": "flipkart",
    "rating": 5,
    "text": "Shoes bahut ache hain. Quality top class. Marathon ke liye use kiya",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R096",
    "likes": 12,
    "createdAt": "2024-03-27T00:00:00.000Z"
  },
  {
    "id": "r097",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent cushioning! Perfect for long distance running 🏃‍♂️",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R097",
    "likes": 12,
    "createdAt": "2024-03-28T00:00:00.000Z"
  },
  {
    "id": "2024-03-29",
    "platform": "amazon",
    "rating": null,
    "text": "Sure",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "2024-03-29",
    "likes": 12,
    "createdAt": "2000-12-31T18:30:00.000Z"
  },
  {
    "id": "r099",
    "platform": "amazon",
    "rating": 5,
    "text": "Super shoes! Long distance run madoke perfect. ಕಾಲಿಗೆ pain baralla",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R099",
    "likes": 12,
    "createdAt": "2024-03-30T00:00:00.000Z"
  },
  {
    "id": "r100",
    "platform": "amazon",
    "rating": 5,
    "text": "excellent excellent excellent comfort comfort comfort best best best",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Adidas Running Shoes",
    "author": "R100",
    "likes": 12,
    "createdAt": "2024-03-31T00:00:00.000Z"
  },
  {
    "id": "r101",
    "platform": "flipkart",
    "rating": 5,
    "text": "Excellent washing machine! Cleans clothes perfectly. Low noise operation 🔇",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R101",
    "likes": 12,
    "createdAt": "2024-04-01T00:00:00.000Z"
  },
  {
    "id": "r102",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut badhiya machine hai. Kapde saaf ho jaate hain. Energy saving bhi hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R102",
    "likes": 12,
    "createdAt": "2024-04-02T00:00:00.000Z"
  },
  {
    "id": "r103",
    "platform": "twitter",
    "rating": 5,
    "text": "Super machine! ಬಟ್ಟೆ clean aagutte. Water saving feature thumba good",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R103",
    "likes": 12,
    "createdAt": "2024-04-03T00:00:00.000Z"
  },
  {
    "id": "r104",
    "platform": "amazon",
    "rating": 1,
    "text": "not working proparly. makes to much nois. cloths not clean proparly",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R104",
    "likes": 212,
    "createdAt": "2024-04-04T00:00:00.000Z"
  },
  {
    "id": "r105",
    "platform": "amazon",
    "rating": 3,
    "text": "Good machine but takes too long to complete wash cycle. Otherwise fine",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R105",
    "likes": 75,
    "createdAt": "2024-04-05T00:00:00.000Z"
  },
  {
    "id": "r106",
    "platform": "flipkart",
    "rating": 4,
    "text": "Machine achha hai. Automatic features bahut helpful. Drying bhi acchi hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R106",
    "likes": 30,
    "createdAt": "2024-04-06T00:00:00.000Z"
  },
  {
    "id": "r107",
    "platform": "youtube",
    "rating": 5,
    "text": "Great product! Multiple wash modes available. Very efficient 💯",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R107",
    "likes": 12,
    "createdAt": "2024-04-07T00:00:00.000Z"
  },
  {
    "id": "r108",
    "platform": "twitter",
    "rating": 2,
    "text": "Love a machine that takes 3 hours for one load. So efficient! ⏰",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 73,
    "revenueRisk": 204400,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R108",
    "likes": 182,
    "createdAt": "2024-04-08T00:00:00.000Z"
  },
  {
    "id": "r109",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba chennaagide! ಬಟ್ಟೆ bekaaagade clean aagutte. Worth the price",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R109",
    "likes": 12,
    "createdAt": "2024-04-09T00:00:00.000Z"
  },
  {
    "id": "r110",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good best best best buy buy buy excellent excellent excellent",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "LG Washing Machine",
    "author": "R110",
    "likes": 12,
    "createdAt": "2024-04-10T00:00:00.000Z"
  },
  {
    "id": "r111",
    "platform": "flipkart",
    "rating": 5,
    "text": "Amazing gaming experience! 🎮 Graphics are stunning. Loading times super fast",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R111",
    "likes": 12,
    "createdAt": "2024-04-11T00:00:00.000Z"
  },
  {
    "id": "r112",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut mast hai! Gaming experience ekdum next level. Graphics kamal ke hain",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R112",
    "likes": 12,
    "createdAt": "2024-04-12T00:00:00.000Z"
  },
  {
    "id": "r113",
    "platform": "twitter",
    "rating": 5,
    "text": "Super console! Graphics thumba clear aagide. Games fast load aagutte",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R113",
    "likes": 12,
    "createdAt": "2024-04-13T00:00:00.000Z"
  },
  {
    "id": "r114",
    "platform": "amazon",
    "rating": 1,
    "text": "overprice trash. not worth it at all. better buy xbox insted",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Delivery",
        "sentiment": "negative",
        "confidence": 0.79
      },
      {
        "name": "Value",
        "sentiment": "negative",
        "confidence": 0.8
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "delivery",
        "sentiment": "negative"
      },
      {
        "word": "value",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R114",
    "likes": 212,
    "createdAt": "2024-04-14T00:00:00.000Z"
  },
  {
    "id": "r115",
    "platform": "amazon",
    "rating": 3,
    "text": "Good console but controller battery drains very quickly. Need frequent charging",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R115",
    "likes": 75,
    "createdAt": "2024-04-15T00:00:00.000Z"
  },
  {
    "id": "r116",
    "platform": "flipkart",
    "rating": 5,
    "text": "Console bahut achha hai. 4K gaming mast hai. Exclusive games bhi badhiya",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R116",
    "likes": 12,
    "createdAt": "2024-04-16T00:00:00.000Z"
  },
  {
    "id": "r117",
    "platform": "youtube",
    "rating": 5,
    "text": "Incredible gaming console! Best investment for gamers 🕹️",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R117",
    "likes": 12,
    "createdAt": "2024-04-17T00:00:00.000Z"
  },
  {
    "id": "r118",
    "platform": "twitter",
    "rating": 2,
    "text": "Absolutely thrilled to pay double for a console that\\'s never in stock! 💸",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Performance",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 73,
    "revenueRisk": 328500,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R118",
    "likes": 182,
    "createdAt": "2024-04-18T00:00:00.000Z"
  },
  {
    "id": "r119",
    "platform": "amazon",
    "rating": 5,
    "text": "Gaming experience thumba chennagide! ಗ್ರಾಫಿಕ್ಸ್ super clear. Must buy",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R119",
    "likes": 12,
    "createdAt": "2024-04-19T00:00:00.000Z"
  },
  {
    "id": "r120",
    "platform": "amazon",
    "rating": 5,
    "text": "amazing amazing amazing best best best gaming gaming gaming perfect perfect",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Sony PlayStation 5",
    "author": "R120",
    "likes": 12,
    "createdAt": "2024-04-20T00:00:00.000Z"
  },
  {
    "id": "r121",
    "platform": "flipkart",
    "rating": 5,
    "text": "Perfect fit! 👖 Comfortable fabric. Good quality denim that lasts long",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R121",
    "likes": 12,
    "createdAt": "2024-04-21T00:00:00.000Z"
  },
  {
    "id": "r122",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut comfortable jeans hai. Fit perfect hai. Quality bhi top notch",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R122",
    "likes": 12,
    "createdAt": "2024-04-22T00:00:00.000Z"
  },
  {
    "id": "r123",
    "platform": "twitter",
    "rating": 5,
    "text": "Super jeans! Fit thumba chennagide. ಬಟ್ಟೆ quality excellent aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R123",
    "likes": 12,
    "createdAt": "2024-04-23T00:00:00.000Z"
  },
  {
    "id": "r124",
    "platform": "amazon",
    "rating": 1,
    "text": "fake levis. stitching came lose after 2 wears. color also fading",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R124",
    "likes": 212,
    "createdAt": "2024-04-24T00:00:00.000Z"
  },
  {
    "id": "r125",
    "platform": "amazon",
    "rating": 4,
    "text": "Good jeans but slightly expensive. Quality justifies the price though",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      },
      {
        "name": "Value",
        "sentiment": "positive",
        "confidence": 0.8
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      },
      {
        "word": "value",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R125",
    "likes": 30,
    "createdAt": "2024-04-25T00:00:00.000Z"
  },
  {
    "id": "r126",
    "platform": "flipkart",
    "rating": 5,
    "text": "Jeans acchi hai. Comfortable hai pure din. Office wear ke liye perfect",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R126",
    "likes": 12,
    "createdAt": "2024-04-26T00:00:00.000Z"
  },
  {
    "id": "r127",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent denim quality! Classic fit. Never goes out of style ✨",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R127",
    "likes": 12,
    "createdAt": "2024-04-27T00:00:00.000Z"
  },
  {
    "id": "r128",
    "platform": "twitter",
    "rating": 1,
    "text": "Love jeans that lose shape after one wash. Fashion statement! 🤷",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 93,
    "revenueRisk": 186000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R128",
    "likes": 232,
    "createdAt": "2024-04-28T00:00:00.000Z"
  },
  {
    "id": "r129",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba comfortable! Daily wear madbahudu. ಬಟ್ಟೆ durable aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R129",
    "likes": 12,
    "createdAt": "2024-04-29T00:00:00.000Z"
  },
  {
    "id": "r130",
    "platform": "amazon",
    "rating": 5,
    "text": "best best best fit fit fit comfort comfort comfort quality quality quality",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Levi's Jeans",
    "author": "R130",
    "likes": 12,
    "createdAt": "2024-04-30T00:00:00.000Z"
  },
  {
    "id": "r131",
    "platform": "flipkart",
    "rating": 5,
    "text": "Excellent fan! Strong air delivery. Silent operation even at high speed 🌀",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Delivery",
        "sentiment": "positive",
        "confidence": 0.79
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "delivery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R131",
    "likes": 12,
    "createdAt": "2024-05-01T00:00:00.000Z"
  },
  {
    "id": "r132",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut achha fan hai. Hawa bhi tez aati hai. Bijli ki bachay bhi hoti hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R132",
    "likes": 12,
    "createdAt": "2024-05-02T00:00:00.000Z"
  },
  {
    "id": "r133",
    "platform": "twitter",
    "rating": 5,
    "text": "Super fan! ಗಾಳಿ thumba fast baratte. Silent operation. Good for bedroom",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R133",
    "likes": 12,
    "createdAt": "2024-05-03T00:00:00.000Z"
  },
  {
    "id": "r134",
    "platform": "amazon",
    "rating": 1,
    "text": "worst fan. makes lot of nois. air delvery very weak. dont buy",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R134",
    "likes": 212,
    "createdAt": "2024-05-04T00:00:00.000Z"
  },
  {
    "id": "r135",
    "platform": "amazon",
    "rating": 3,
    "text": "Good fan but installation was difficult. Service person took too long",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R135",
    "likes": 75,
    "createdAt": "2024-05-05T00:00:00.000Z"
  },
  {
    "id": "r136",
    "platform": "flipkart",
    "rating": 4,
    "text": "Fan bahut accha hai. Remote control feature bhi hai. Energy efficient",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R136",
    "likes": 30,
    "createdAt": "2024-05-06T00:00:00.000Z"
  },
  {
    "id": "r137",
    "platform": "youtube",
    "rating": 5,
    "text": "Perfect for summer! High speed mode is very powerful 💨",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R137",
    "likes": 12,
    "createdAt": "2024-05-07T00:00:00.000Z"
  },
  {
    "id": "2024-05-08",
    "platform": "amazon",
    "rating": null,
    "text": "Oh great",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "2024-05-08",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r139",
    "platform": "amazon",
    "rating": 5,
    "text": "Excellent fan! Power consumption kimi. ಗಾಳಿ delivery super aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Delivery",
        "sentiment": "positive",
        "confidence": 0.79
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "delivery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R139",
    "likes": 12,
    "createdAt": "2024-05-09T00:00:00.000Z"
  },
  {
    "id": "r140",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good powerful powerful powerful silent silent silent best best",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Havells Ceiling Fan",
    "author": "R140",
    "likes": 12,
    "createdAt": "2024-05-10T00:00:00.000Z"
  },
  {
    "id": "r141",
    "platform": "flipkart",
    "rating": 5,
    "text": "Best earbuds ever! 🎧 Noise cancellation is incredible. Sound quality superb",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R141",
    "likes": 12,
    "createdAt": "2024-05-11T00:00:00.000Z"
  },
  {
    "id": "r142",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut mast hai! Sound quality kamal ki hai. Apple ecosystem ke liye best",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R142",
    "likes": 12,
    "createdAt": "2024-05-12T00:00:00.000Z"
  },
  {
    "id": "r143",
    "platform": "twitter",
    "rating": 5,
    "text": "Super earbuds! Noise cancelling thumba effective. ಸೌಂಡ್ crystal clear",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R143",
    "likes": 12,
    "createdAt": "2024-05-13T00:00:00.000Z"
  },
  {
    "id": "r144",
    "platform": "amazon",
    "rating": 1,
    "text": "overprice. not worth the mony. sound quality same as cheap ones",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "negative",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      },
      {
        "name": "Value",
        "sentiment": "negative",
        "confidence": 0.8
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "negative"
      },
      {
        "word": "build quality",
        "sentiment": "negative"
      },
      {
        "word": "value",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R144",
    "likes": 212,
    "createdAt": "2024-05-14T00:00:00.000Z"
  },
  {
    "id": "r145",
    "platform": "amazon",
    "rating": 4,
    "text": "Good earbuds but case scratches very easily. Otherwise perfect",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R145",
    "likes": 30,
    "createdAt": "2024-05-15T00:00:00.000Z"
  },
  {
    "id": "r146",
    "platform": "flipkart",
    "rating": 5,
    "text": "AirPods bahut ache hain. Battery life achhi hai. Calling clarity bhi mast",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R146",
    "likes": 12,
    "createdAt": "2024-05-16T00:00:00.000Z"
  },
  {
    "id": "r147",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent! Transparency mode is amazing. Perfect for daily commute 🚇",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R147",
    "likes": 12,
    "createdAt": "2024-05-17T00:00:00.000Z"
  },
  {
    "id": "2024-05-18",
    "platform": "amazon",
    "rating": null,
    "text": "Sure",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "2024-05-18",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r149",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba chennagide! Music experience next level. ಬ್ಯಾಟರಿ long lasting",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R149",
    "likes": 12,
    "createdAt": "2024-05-19T00:00:00.000Z"
  },
  {
    "id": "r150",
    "platform": "amazon",
    "rating": 5,
    "text": "amazing amazing amazing best best best sound sound sound quality quality",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Sound",
        "sentiment": "positive",
        "confidence": 0.88
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Apple AirPods Pro",
    "author": "R150",
    "likes": 12,
    "createdAt": "2024-05-20T00:00:00.000Z"
  },
  {
    "id": "r151",
    "platform": "flipkart",
    "rating": 5,
    "text": "Spacious and durable! 💼 Multiple compartments. Perfect for gym essentials",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R151",
    "likes": 12,
    "createdAt": "2024-05-21T00:00:00.000Z"
  },
  {
    "id": "r152",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut achha bag hai. Space bhi kaafi hai. Gym ke liye best choice",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R152",
    "likes": 12,
    "createdAt": "2024-05-22T00:00:00.000Z"
  },
  {
    "id": "r153",
    "platform": "twitter",
    "rating": 5,
    "text": "Super bag! ತುಂಬಾ compartments ide. Gym equipment elavu adjust aagutte",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R153",
    "likes": 12,
    "createdAt": "2024-05-23T00:00:00.000Z"
  },
  {
    "id": "r154",
    "platform": "amazon",
    "rating": 1,
    "text": "zip broken after 1 weak. very bad quality. stitching also coming lose",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R154",
    "likes": 212,
    "createdAt": "2024-05-24T00:00:00.000Z"
  },
  {
    "id": "r155",
    "platform": "amazon",
    "rating": 3,
    "text": "Good bag but straps are not very comfortable on shoulders. Rest is fine",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "neutral",
        "confidence": 0.85
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R155",
    "likes": 75,
    "createdAt": "2024-05-25T00:00:00.000Z"
  },
  {
    "id": "r156",
    "platform": "flipkart",
    "rating": 4,
    "text": "Bag achha hai. Material water resistant hai. Design bhi stylish hai",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R156",
    "likes": 30,
    "createdAt": "2024-05-26T00:00:00.000Z"
  },
  {
    "id": "r157",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent quality! Enough space for clothes and shoes 👟",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R157",
    "likes": 12,
    "createdAt": "2024-05-27T00:00:00.000Z"
  },
  {
    "id": "r158",
    "platform": "twitter",
    "rating": 1,
    "text": "Love a bag that rips after one month. Quality craftsmanship! 🎖️",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 93,
    "revenueRisk": 186000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R158",
    "likes": 232,
    "createdAt": "2024-05-28T00:00:00.000Z"
  },
  {
    "id": "r159",
    "platform": "amazon",
    "rating": 5,
    "text": "Bag thumba useful! All gym items fit aagutte. ಬಟ್ಟೆ quality strong",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R159",
    "likes": 12,
    "createdAt": "2024-05-29T00:00:00.000Z"
  },
  {
    "id": "r160",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good spacious spacious spacious quality quality quality bag bag",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Reebok Gym Bag",
    "author": "R160",
    "likes": 12,
    "createdAt": "2024-05-30T00:00:00.000Z"
  },
  {
    "id": "r161",
    "platform": "flipkart",
    "rating": 5,
    "text": "Excellent water purifier! 💧 Water tastes pure. Easy to maintain",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R161",
    "likes": 12,
    "createdAt": "2024-05-31T00:00:00.000Z"
  },
  {
    "id": "r162",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut achha hai. Paani bilkul saaf aata hai. Health ke liye important",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R162",
    "likes": 12,
    "createdAt": "2024-06-01T00:00:00.000Z"
  },
  {
    "id": "r163",
    "platform": "twitter",
    "rating": 5,
    "text": "Super purifier! ನೀರು thumba clean aagutte. Installation easy aagittu",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R163",
    "likes": 12,
    "createdAt": "2024-06-02T00:00:00.000Z"
  },
  {
    "id": "r164",
    "platform": "amazon",
    "rating": 1,
    "text": "not working proparly. water test show still impuritys. waist of mony",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R164",
    "likes": 212,
    "createdAt": "2024-06-03T00:00:00.000Z"
  },
  {
    "id": "r165",
    "platform": "amazon",
    "rating": 3,
    "text": "Good purifier but service is very expensive. Filter replacement costs too much",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Value",
        "sentiment": "neutral",
        "confidence": 0.8
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "value",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R165",
    "likes": 75,
    "createdAt": "2024-06-04T00:00:00.000Z"
  },
  {
    "id": "r166",
    "platform": "flipkart",
    "rating": 4,
    "text": "Purifier accha hai. RO+UV dono hain. Mineral water milta hai ghar par",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R166",
    "likes": 30,
    "createdAt": "2024-06-05T00:00:00.000Z"
  },
  {
    "id": "r167",
    "platform": "youtube",
    "rating": 5,
    "text": "Perfect for home! Multiple stage purification. Very reliable 🏡",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R167",
    "likes": 12,
    "createdAt": "2024-06-06T00:00:00.000Z"
  },
  {
    "id": "r168",
    "platform": "twitter",
    "rating": 2,
    "text": "Amazing how a purifier can waste more water than it cleans. Innovation! 💦",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 73,
    "revenueRisk": 204400,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R168",
    "likes": 182,
    "createdAt": "2024-06-07T00:00:00.000Z"
  },
  {
    "id": "r169",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba chennagide! ನೀರು safe aagutte. Family health ge good investment",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R169",
    "likes": 12,
    "createdAt": "2024-06-08T00:00:00.000Z"
  },
  {
    "id": "r170",
    "platform": "amazon",
    "rating": 5,
    "text": "best best best pure pure pure water water water clean clean clean",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Kent Water Purifier",
    "author": "R170",
    "likes": 12,
    "createdAt": "2024-06-09T00:00:00.000Z"
  },
  {
    "id": "r171",
    "platform": "flipkart",
    "rating": 5,
    "text": "Stunning image quality! 📷 Perfect for professional photography. Easy to use",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "camera",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R171",
    "likes": 12,
    "createdAt": "2024-06-10T00:00:00.000Z"
  },
  {
    "id": "r172",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut badhiya camera hai. Photos crystal clear aate hain. Video bhi mast",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "camera",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R172",
    "likes": 12,
    "createdAt": "2024-06-11T00:00:00.000Z"
  },
  {
    "id": "r173",
    "platform": "twitter",
    "rating": 5,
    "text": "Super camera! Photos thumba clear baratte. ವೀಡಿಯೋ quality excellent",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "camera",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R173",
    "likes": 12,
    "createdAt": "2024-06-12T00:00:00.000Z"
  },
  {
    "id": "r174",
    "platform": "amazon",
    "rating": 1,
    "text": "not worth the prise. heavy to carry. picture quality not that good",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Camera",
        "sentiment": "negative",
        "confidence": 0.87
      },
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      },
      {
        "name": "Value",
        "sentiment": "negative",
        "confidence": 0.8
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "camera",
        "sentiment": "negative"
      },
      {
        "word": "build quality",
        "sentiment": "negative"
      },
      {
        "word": "value",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R174",
    "likes": 212,
    "createdAt": "2024-06-13T00:00:00.000Z"
  },
  {
    "id": "r175",
    "platform": "amazon",
    "rating": 3,
    "text": "Good camera but battery life is poor. Need extra batteries for long shoots",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      },
      {
        "name": "Camera",
        "sentiment": "neutral",
        "confidence": 0.87
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      },
      {
        "word": "camera",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R175",
    "likes": 75,
    "createdAt": "2024-06-14T00:00:00.000Z"
  },
  {
    "id": "r176",
    "platform": "flipkart",
    "rating": 4,
    "text": "Camera bahut achha hai. Low light performance bhi good. Recommended for beginners",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "camera",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R176",
    "likes": 30,
    "createdAt": "2024-06-15T00:00:00.000Z"
  },
  {
    "id": "r177",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent DSLR! Autofocus is fast and accurate. Great investment 💯",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R177",
    "likes": 12,
    "createdAt": "2024-06-16T00:00:00.000Z"
  },
  {
    "id": "2024-06-17",
    "platform": "amazon",
    "rating": null,
    "text": "Yes",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "2024-06-17",
    "likes": 12,
    "createdAt": "2001-01-31T18:30:00.000Z"
  },
  {
    "id": "r179",
    "platform": "amazon",
    "rating": 5,
    "text": "Professional quality! ಫೋಟೋ quality next level. Wedding shoot ge perfect",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R179",
    "likes": 12,
    "createdAt": "2024-06-18T00:00:00.000Z"
  },
  {
    "id": "r180",
    "platform": "amazon",
    "rating": 5,
    "text": "amazing amazing amazing picture picture picture quality quality quality best",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Camera",
        "sentiment": "positive",
        "confidence": 0.87
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "camera",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Canon DSLR Camera",
    "author": "R180",
    "likes": 12,
    "createdAt": "2024-06-19T00:00:00.000Z"
  },
  {
    "id": "r181",
    "platform": "flipkart",
    "rating": 5,
    "text": "Premium quality wallet! 👛 Genuine leather. Multiple card slots. Very durable",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R181",
    "likes": 12,
    "createdAt": "2024-06-20T00:00:00.000Z"
  },
  {
    "id": "r182",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut achha wallet hai. Leather quality top class. Pocket mein fit bhi ho jata",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "positive",
        "confidence": 0.85
      },
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "positive"
      },
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R182",
    "likes": 12,
    "createdAt": "2024-06-21T00:00:00.000Z"
  },
  {
    "id": "r183",
    "platform": "twitter",
    "rating": 5,
    "text": "Super wallet! Leather quality thumba good. ಕಾರ್ಡ್ slots bere ide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R183",
    "likes": 12,
    "createdAt": "2024-06-22T00:00:00.000Z"
  },
  {
    "id": "r184",
    "platform": "amazon",
    "rating": 1,
    "text": "fake lether. started peling after few days. stitching also very bad",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.82
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 170000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R184",
    "likes": 212,
    "createdAt": "2024-06-23T00:00:00.000Z"
  },
  {
    "id": "r185",
    "platform": "amazon",
    "rating": 3,
    "text": "Good wallet but slightly bulky. Doesn\\'t fit well in tight pockets",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Comfort",
        "sentiment": "neutral",
        "confidence": 0.85
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "comfort",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R185",
    "likes": 75,
    "createdAt": "2024-06-24T00:00:00.000Z"
  },
  {
    "id": "r186",
    "platform": "flipkart",
    "rating": 4,
    "text": "Wallet achha hai. RFID protection bhi hai. Design classic aur elegant",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R186",
    "likes": 30,
    "createdAt": "2024-06-25T00:00:00.000Z"
  },
  {
    "id": "r187",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent craftsmanship! Leather smell and feel is authentic ✨",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R187",
    "likes": 12,
    "createdAt": "2024-06-26T00:00:00.000Z"
  },
  {
    "id": "r188",
    "platform": "twitter",
    "rating": 1,
    "text": "Love paying premium for \\'leather\\' that peels like cheap plastic! 🎭",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 93,
    "revenueRisk": 186000,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R188",
    "likes": 232,
    "createdAt": "2024-06-27T00:00:00.000Z"
  },
  {
    "id": "r189",
    "platform": "amazon",
    "rating": 5,
    "text": "Thumba durable! Long time chalatte. ಲೆದರ್ quality original aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R189",
    "likes": 12,
    "createdAt": "2024-06-28T00:00:00.000Z"
  },
  {
    "id": "r190",
    "platform": "amazon",
    "rating": 5,
    "text": "good good good quality quality quality leather leather leather best best",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Build Quality",
        "sentiment": "positive",
        "confidence": 0.82
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "build quality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Fashion",
    "brandName": "Woodland Leather Wallet",
    "author": "R190",
    "likes": 12,
    "createdAt": "2024-06-29T00:00:00.000Z"
  },
  {
    "id": "r191",
    "platform": "flipkart",
    "rating": 5,
    "text": "Powerful motor! 🔌 Grinds everything smoothly. Very sturdy and durable",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R191",
    "likes": 12,
    "createdAt": "2024-06-30T00:00:00.000Z"
  },
  {
    "id": "r192",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut powerful hai. Sab kuch achhe se grind ho jata. 3 jars bhi hain",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R192",
    "likes": 12,
    "createdAt": "2024-07-01T00:00:00.000Z"
  },
  {
    "id": "r193",
    "platform": "twitter",
    "rating": 5,
    "text": "Super mixer! ಎಲ್ಲಾ grind aagutte easily. Motor thumba powerful",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R193",
    "likes": 12,
    "createdAt": "2024-07-02T00:00:00.000Z"
  },
  {
    "id": "r194",
    "platform": "amazon",
    "rating": 1,
    "text": "motor burnt after 2 months. blades also not sharp. very bad prodact",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "negative",
        "confidence": 0.75
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 238000,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R194",
    "likes": 212,
    "createdAt": "2024-07-03T00:00:00.000Z"
  },
  {
    "id": "r195",
    "platform": "amazon",
    "rating": 3,
    "text": "Good mixer but makes lot of noise during operation. Rest is satisfactory",
    "language": "en",
    "sentiment": "neutral",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "neutral",
        "confidence": 0.75
      }
    ],
    "dangerScore": 30,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "neutral"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R195",
    "likes": 75,
    "createdAt": "2024-07-04T00:00:00.000Z"
  },
  {
    "id": "r196",
    "platform": "flipkart",
    "rating": 4,
    "text": "Mixer achha hai. Wet aur dry dono grinding achhi hoti hai. Value for money",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 12,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R196",
    "likes": 30,
    "createdAt": "2024-07-05T00:00:00.000Z"
  },
  {
    "id": "r197",
    "platform": "youtube",
    "rating": 5,
    "text": "Excellent product! Perfect for Indian kitchen. Multiple jars included 🍛",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R197",
    "likes": 12,
    "createdAt": "2024-07-06T00:00:00.000Z"
  },
  {
    "id": "r198",
    "platform": "twitter",
    "rating": 2,
    "text": "Absolutely love a mixer that sounds like a jet engine. So peaceful! ✈️",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": true,
    "sarcasticConfidence": 0.88,
    "features": [
      {
        "name": "Sound",
        "sentiment": "negative",
        "confidence": 0.88
      }
    ],
    "dangerScore": 73,
    "revenueRisk": 204400,
    "highlights": [
      {
        "word": "sound",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R198",
    "likes": 182,
    "createdAt": "2024-07-07T00:00:00.000Z"
  },
  {
    "id": "r199",
    "platform": "amazon",
    "rating": 5,
    "text": "Mixer thumba powerful! Daily use ge perfect. ಎಲ್ಲಾ jar useful aagide",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R199",
    "likes": 12,
    "createdAt": "2024-07-08T00:00:00.000Z"
  },
  {
    "id": "r200",
    "platform": "amazon",
    "rating": 5,
    "text": "best best best powerful powerful powerful motor motor motor grinder grinder",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Functionality",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "functionality",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Home Appliances",
    "brandName": "Bajaj Mixer Grinder",
    "author": "R200",
    "likes": 12,
    "createdAt": "2024-07-09T00:00:00.000Z"
  },
  {
    "id": "r201",
    "platform": "flipkart",
    "rating": 1,
    "text": "Phone heating issue getting worse. Can\\'t even hold during video calls now",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R201",
    "likes": 212,
    "createdAt": "2024-03-08T00:00:00.000Z"
  },
  {
    "id": "r202",
    "platform": "youtube",
    "rating": 2,
    "text": "Overheating problem is severe. Apps crash due to excessive heating",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R202",
    "likes": 162,
    "createdAt": "2024-03-10T00:00:00.000Z"
  },
  {
    "id": "r203",
    "platform": "twitter",
    "rating": 2,
    "text": "Heating issue making phone unusable. Battery drains fast due to heat",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R203",
    "likes": 162,
    "createdAt": "2024-03-12T00:00:00.000Z"
  },
  {
    "id": "r204",
    "platform": "amazon",
    "rating": 1,
    "text": "Phone becomes extremely hot. Heating problem needs immediate fix",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R204",
    "likes": 212,
    "createdAt": "2024-03-15T00:00:00.000Z"
  },
  {
    "id": "r205",
    "platform": "amazon",
    "rating": 2,
    "text": "Terrible heating issue. Phone getting hot even during basic tasks",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R205",
    "likes": 162,
    "createdAt": "2024-03-18T00:00:00.000Z"
  },
  {
    "id": "r206",
    "platform": "flipkart",
    "rating": 1,
    "text": "Heating problem is dangerous. Phone too hot to touch sometimes",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R206",
    "likes": 212,
    "createdAt": "2024-03-20T00:00:00.000Z"
  },
  {
    "id": "r207",
    "platform": "youtube",
    "rating": 2,
    "text": "Overheating ruins the experience. Otherwise good phone but heat is unbearable",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R207",
    "likes": 162,
    "createdAt": "2024-03-22T00:00:00.000Z"
  },
  {
    "id": "r208",
    "platform": "twitter",
    "rating": 2,
    "text": "Phone heats up alarmingly fast. Major heating issue needs Samsung attention",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R208",
    "likes": 162,
    "createdAt": "2024-03-25T00:00:00.000Z"
  },
  {
    "id": "r209",
    "platform": "amazon",
    "rating": 1,
    "text": "Heating issue makes camera app crash. Phone burning hot after 5 mins use",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Camera",
        "sentiment": "negative",
        "confidence": 0.87
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "camera",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R209",
    "likes": 212,
    "createdAt": "2024-03-28T00:00:00.000Z"
  },
  {
    "id": "r210",
    "platform": "amazon",
    "rating": 2,
    "text": "Severe overheating problem. Can\\'t charge phone while using due to heat",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Heating",
        "sentiment": "negative",
        "confidence": 0.93
      },
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 65,
    "revenueRisk": 292500,
    "highlights": [
      {
        "word": "heating",
        "sentiment": "negative"
      },
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Samsung Galaxy S23",
    "author": "R210",
    "likes": 162,
    "createdAt": "2024-03-30T00:00:00.000Z"
  },
  {
    "id": "r211",
    "platform": "flipkart",
    "rating": 5,
    "text": "Great smartwatch! ⌚ Tracks fitness accurately. Battery lasts 7 days easily",
    "language": "en",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Noise Smart Watch",
    "author": "R211",
    "likes": 12,
    "createdAt": "2024-07-10T00:00:00.000Z"
  },
  {
    "id": "r212",
    "platform": "youtube",
    "rating": 5,
    "text": "Bahut achha watch hai. Health monitoring features bhi hain. Value for money",
    "language": "hi",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Performance",
        "sentiment": "positive",
        "confidence": 0.75
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "performance",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Noise Smart Watch",
    "author": "R212",
    "likes": 12,
    "createdAt": "2024-07-11T00:00:00.000Z"
  },
  {
    "id": "r213",
    "platform": "twitter",
    "rating": 5,
    "text": "Super watch! ಫಿಟ್ನೆಸ್ tracking accurate aagide. Battery long lasting",
    "language": "kn",
    "sentiment": "positive",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "positive",
        "confidence": 0.9
      }
    ],
    "dangerScore": 5,
    "revenueRisk": 0,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "positive"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Noise Smart Watch",
    "author": "R213",
    "likes": 12,
    "createdAt": "2024-07-12T00:00:00.000Z"
  },
  {
    "id": "r214",
    "platform": "amazon",
    "rating": 1,
    "text": "touch not working proparly. battery draning very fast. not satisfied",
    "language": "en",
    "sentiment": "negative",
    "isSarcastic": false,
    "sarcasticConfidence": 0.07,
    "features": [
      {
        "name": "Battery",
        "sentiment": "negative",
        "confidence": 0.9
      }
    ],
    "dangerScore": 85,
    "revenueRisk": 382500,
    "highlights": [
      {
        "word": "battery",
        "sentiment": "negative"
      }
    ],
    "productCategory": "Electronics",
    "brandName": "Noise Smart Watch",
    "author": "R214",
    "likes": 212,
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
] as Review[];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a001', feature: 'Heating', dangerScore: 91, revenueRisk: 4095000,
    message: '🔥 Samsung Galaxy S23 overheating complaints surged +45%. 16 out of 20 reviews mention heating as primary issue.',
    reviewCount: 16, trend: 'rising', trendPercent: 45, isRead: false, severity: 'critical', createdAt: daysAgo(0),
  },
  {
    id: 'a002', feature: 'Build Quality', dangerScore: 72, revenueRisk: 1440000,
    message: '⚠️ Fake product complaints across Fashion (Nike, Adidas, Puma, Levi\'s). 8 reviews report quality failure within days.',
    reviewCount: 8, trend: 'rising', trendPercent: 28, isRead: false, severity: 'critical', createdAt: daysAgo(1),
  },
  {
    id: 'a003', feature: 'Battery', dangerScore: 65, revenueRisk: 897750,
    message: '🔋 Battery drain complaints for Boat Airdopes 141 and Sony PS5 controller. Users cite 2-3 hour battery life.',
    reviewCount: 4, trend: 'rising', trendPercent: 18, isRead: false, severity: 'medium', createdAt: daysAgo(1),
  },
  {
    id: 'a004', feature: 'Sound Quality', dangerScore: 10, revenueRisk: 0,
    message: '✅ Sound quality 90%+ positive across Boat Airdopes, OnePlus Bullets, Apple AirPods Pro.',
    reviewCount: 12, trend: 'stable', trendPercent: 2, isRead: true, severity: 'low', createdAt: daysAgo(2),
  },
  {
    id: 'a005', feature: 'Value', dangerScore: 55, revenueRisk: 247500,
    message: '💰 Price-to-value complaints rising for Apple AirPods Pro and Sony PS5. Customers comparing with cheaper alternatives.',
    reviewCount: 5, trend: 'rising', trendPercent: 12, isRead: true, severity: 'medium', createdAt: daysAgo(3),
  },
];

export const MOCK_PLAYBOOK: PlaybookAction[] = [
  { id:'p001', title:'Escalate Samsung Galaxy S23 heating to Samsung India', description:'Share 16-review heating report. Request OTA fix or replacement program.', feature:'Heating', priority:'high', owner:'Product Manager', status:'inprogress', dueDate:daysAgo(-2), linkedAlertId:'a001', createdAt:daysAgo(1) },
  { id:'p002', title:'Flag fake Fashion products to platform compliance', description:'Report Nike, Adidas, Puma fake reviews to Amazon/Flipkart seller compliance.', feature:'Build Quality', priority:'high', owner:'Operations Lead', status:'todo', dueDate:daysAgo(-3), linkedAlertId:'a002', createdAt:daysAgo(1) },
  { id:'p003', title:'Reply to top Samsung heating complaints with AI', description:'Use AI auto-reply to respond to top 10 heating reviews empathetically.', feature:'Heating', priority:'medium', owner:'Brand Manager', status:'todo', dueDate:daysAgo(-1), linkedAlertId:'a001', createdAt:daysAgo(0) },
  { id:'p004', title:'Publish battery care guide for Boat Airdopes users', description:'FAQ post on battery optimization and share with affected reviewers.', feature:'Battery', priority:'medium', owner:'CX Team', status:'done', dueDate:daysAgo(0), linkedAlertId:'a003', createdAt:daysAgo(2) },
  { id:'p005', title:'Offer extended warranty to sarcastic-review customers', description:'Identify sarcastic reviewers (7 flagged) and proactively offer 6-month extension.', feature:'Value', priority:'low', owner:'CX Team', status:'todo', dueDate:daysAgo(-5), linkedAlertId:'a005', createdAt:daysAgo(2) },
];

export const MOCK_COMPETITORS: CompetitorBrand[] = [
  { id:'c001', name:'Samsung Galaxy S23 (You)', dangerScore:88, advocateScore:55, reviewCount:20, avgRating:2.1, featureScores:{Heating:91,'Build Quality':72,Battery:65,Camera:20,Value:55,Sound:15} },
  { id:'c002', name:'Apple AirPods Pro', dangerScore:42, advocateScore:80, reviewCount:5, avgRating:3.8, featureScores:{Heating:5,'Build Quality':30,Battery:20,Sound:10,Value:65,Comfort:15} },
  { id:'c003', name:'Boat Airdopes 141', dangerScore:58, advocateScore:68, reviewCount:9, avgRating:3.4, featureScores:{Heating:10,Battery:65,Sound:20,Value:30,Comfort:25,'Build Quality':40} },
  { id:'c004', name:'Nike Air Max', dangerScore:50, advocateScore:70, reviewCount:10, avgRating:3.5, featureScores:{'Build Quality':72,Comfort:20,Value:50,Delivery:35,Heating:0,Battery:0} },
];

export const MOCK_TREND: TrendPoint[] = [
  { date: daysAgo(6).slice(0,10), dangerScore:38, reviewCount:8 },
  { date: daysAgo(5).slice(0,10), dangerScore:48, reviewCount:11 },
  { date: daysAgo(4).slice(0,10), dangerScore:60, reviewCount:14 },
  { date: daysAgo(3).slice(0,10), dangerScore:68, reviewCount:16 },
  { date: daysAgo(2).slice(0,10), dangerScore:75, reviewCount:18 },
  { date: daysAgo(1).slice(0,10), dangerScore:83, reviewCount:20 },
  { date: daysAgo(0).slice(0,10), dangerScore:91, reviewCount:16 },
];

export const MOCK_FEATURE_SCORES = [
  { feature:'Heat Dissipation',  positive:9,  negative:91 },
  { feature:'Lens Glare',        positive:28, negative:72 },
  { feature:'Weight & Comfort',  positive:35, negative:65 },
  { feature:'Passthrough',       positive:45, negative:55 },
  { feature:'Hand Tracking',     positive:78, negative:22 },
  { feature:'Spatial Audio',     positive:90, negative:10 },
];
