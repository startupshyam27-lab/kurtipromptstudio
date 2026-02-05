import React, { useState } from 'react';
import { 
  Home, Settings2, FileText, ChevronRight,
  Palette, Sparkles, Copy, Search, Wand2, Languages, 
  RotateCcw, Grid2X2,
  ArrowRight, ArrowDown, CheckCircle2, Circle, Layers,
  Shirt, Scissors, PaintBucket, Brush, Star, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import logoImage from '@/assets/logo.png';

interface UserGuideProps {
  trigger?: React.ReactNode;
}

// Translations object
const translations = {
  en: {
    title: 'Complete User Guide',
    langLabel: 'हिंदी',
    overview: {
      title: 'What is Kurti Prompt Studio?',
      desc: 'Kurti Prompt Studio is a powerful tool that helps you create detailed, professional prompts for AI image generators. With 900+ design options and 500+ motifs, you can specify every detail of your kurti design and get a ready-to-use prompt for any AI image tool.',
    },
    workflow: {
      title: '3-Step Workflow',
      step1: {
        title: 'Home Page',
        action: 'Click',
        button: 'Start Designing',
        buttonEnd: 'button to begin',
        whatSee: "What you'll see:",
        whatSeeDesc: 'Welcome page with overview of features, how-it-works guide, and feature highlights',
      },
      step2: {
        title: 'Design Selection',
        features: [
          { name: 'Quick Presets', desc: 'Wedding, Festive, Party, Office, Casual, Minimal' },
          { name: 'Randomize Button', desc: 'Generate random combination for inspiration' },
          { name: 'Search Bar', desc: 'Find any design option instantly with filters' },
          { name: 'Hindi Labels Toggle', desc: 'View options in English + Hindi' },
        ],
        howToUse: 'How to use:',
        steps: [
          { text: 'Use', badge: 'Quick Presets', text2: 'or', badge2: 'Randomize', text3: 'for fast setup' },
          { text: 'Expand categories by clicking on them' },
          { text: 'Select multiple options in each category' },
          { text: 'Use', badge: 'Search', text2: 'to find specific options' },
          { text: 'Click', badge: 'Reset All', text2: 'to start over' },
          { text: 'Click', badge: 'Continue to Generate', text2: 'when ready' },
        ],
      },
      step3: {
        title: 'Generate Prompt',
        features: [
          { name: 'Choose Prompt Style', desc: 'Short, Detailed, or Professional' },
          { name: 'Choose Layout Mode', desc: 'Single, Front & Back, 4 Variations, Full View' },
        ],
        howToUse: 'How to use:',
        steps: [
          'Select prompt style (Short/Detailed/Professional)',
          'Choose layout mode for your image',
          { text: 'Click', badge: 'Generate Prompt' },
          'Review the generated prompt',
          { text: 'Click', badge: 'Copy Prompt' },
          'Paste into ChatGPT, Midjourney, DALL-E, or any AI image tool',
        ],
      },
    },
    factors: {
      title: 'All Design Factors (900+ Options)',
      groups: 'groups',
    },
    promptSettings: {
      title: 'Prompt Settings Explained',
    },
    tips: {
      title: 'Pro Tips',
      items: [
        { bold: 'Start with Presets:', text: 'Use Quick Presets to quickly set up a base design, then customize individual options' },
        { bold: 'Use Randomize:', text: 'Click the Randomize button to discover new design combinations you might not have thought of' },
        { bold: 'Search Feature:', text: 'Use the search bar to quickly find specific options like "Chikankari" or "Anarkali"' },
        { bold: 'Less is More:', text: "You don't need to fill every category - AI works better with focused, clear instructions" },
        { bold: 'Layout Modes:', text: 'Use "Full View" for catalog-style 360° images, "4 Variations" for color options' },
        { bold: 'Hindi Prompts:', text: 'Some AI tools work better with Hindi descriptions for authentic Indian designs' },
      ],
    },
    categories: [
      {
        name: 'Color & Palette',
        factors: [
          { name: 'Color Groups', options: 'Red, Pink, Orange, Yellow, Green, Blue, Purple, Neutral, Metallic, Pastel, White, Black (80+ shades)' },
          { name: 'Custom Color', options: 'Enter any custom color name' },
          { name: 'Color Combinations', options: 'Monochrome, Dual Tone, Tri Color, Ombre, Contrast, Rainbow' },
        ]
      },
      {
        name: 'Fabric & Material',
        factors: [
          { name: 'Cotton Types', options: 'Pure Cotton, Handloom, Slub, Cotton Silk, Khadi, Organic, Jacquard' },
          { name: 'Silk Varieties', options: 'Pure Silk, Art Silk, Raw Silk, Tussar, Banarasi, Kanjivaram, Patola, Mysore, Chanderi' },
          { name: 'Other Fabrics', options: 'Rayon, Linen, Georgette, Crepe, Chanderi, Organza, Net, Velvet, Brocade, Satin, Muslin' },
        ]
      },
      {
        name: 'Silhouette & Structure',
        factors: [
          { name: 'Classic Cuts', options: 'Straight Cut, A-Line, Fitted, Semi-Fitted, Flared, Loose Fit' },
          { name: 'Traditional', options: 'Anarkali, Angrakha, Princess Cut, Empire Line, Peplum, Mermaid, Umbrella Cut' },
          { name: 'Modern Styles', options: 'Kaftan, Shirt Style, Tunic, Jacket Style, Wrap, Layered, Asymmetric' },
          { name: 'Length Options', options: 'Hip Length, Waist Length, Knee Length, Calf Length, Ankle Length, Floor Length' },
        ]
      },
      {
        name: 'Neckline Designs',
        factors: [
          { name: 'Round & U-Neck', options: 'Round Neck, Deep Round, U-Neck, Scoop Neck' },
          { name: 'V-Neck Styles', options: 'V-Neck, Deep V, Sweetheart, Notched V' },
          { name: 'Square & Boat', options: 'Square Neck, Wide Square, Boat Neck, Bateau' },
          { name: 'Collar Types', options: 'Mandarin, Chinese, Band, Peter Pan, Nehru, Shirt Collar, Stand Collar' },
          { name: 'Special Necklines', options: 'Keyhole, Teardrop, Halter, High Neck, Turtle Neck, Cowl Neck' },
        ]
      },
      {
        name: 'Sleeve Styles',
        factors: [
          { name: 'By Length', options: 'Sleeveless, Cap, Short, Elbow, 3/4, Full, Extra Long' },
          { name: 'Shaped Sleeves', options: 'Bell, Flutter, Puff, Balloon, Lantern, Bishop, Trumpet' },
          { name: 'Special Styles', options: 'Cold Shoulder, Off Shoulder, Raglan, Kimono, Dolman, Cape' },
          { name: 'Decorated', options: 'Slit, Layered, Tiered, Ruffled, Lace Sleeves, Embroidered Cuff' },
        ]
      },
      {
        name: 'Embroidery & Handwork',
        factors: [
          { name: 'Traditional', options: 'Chikankari, Lucknowi, Phulkari, Kantha, Kashida, Aari, Zardozi, Gota Patti, Dabka' },
          { name: 'Thread Work', options: 'Resham, French Knot, Cross Stitch, Chain Stitch, Satin Stitch, Shadow Work' },
          { name: 'Metal Work', options: 'Zari Work, Gold Zari, Silver Zari, Copper Zari, Antique Zari' },
          { name: 'Embellished', options: 'Mirror, Sequin, Bead, Pearl, Stone, Kundan, Crystal Work' },
          { name: 'Density Options', options: 'Light, Medium, Heavy coverage' },
        ]
      },
      {
        name: 'Print Techniques',
        factors: [
          { name: 'Block Print', options: 'Hand Block, Dabu, Bagru, Ajrakh, Sanganeri Print' },
          { name: 'Art Prints', options: 'Kalamkari, Madhubani, Warli, Pichwai Print' },
          { name: 'Resist Prints', options: 'Tie-Dye, Bandhani, Leheriya, Shibori, Batik' },
          { name: 'Modern Prints', options: 'Digital, Screen, Foil, Flock, Sublimation Print' },
          { name: 'Pattern Prints', options: 'Ikat, Patola, Geometric, Abstract, Floral, Paisley, Tribal' },
        ]
      },
      {
        name: 'Design Motifs (500+)',
        factors: [
          { name: 'Floral', options: '80+ flowers including Rose, Lotus, Jasmine, Marigold, Lily, Hibiscus' },
          { name: 'Traditional', options: '50+ paisley, butta, jaal patterns' },
          { name: 'Geometric', options: '40+ shapes including chevron, mandala, lattice' },
          { name: 'Cultural', options: '60+ temple, mughal, rajasthani motifs' },
          { name: 'Nature', options: '50+ peacock, elephant, bird, leaf designs' },
          { name: 'Abstract', options: '40+ contemporary and modern patterns' },
        ]
      },
      {
        name: 'Construction Details',
        factors: [
          { name: 'Border Styles', options: 'Plain, Contrast, Embroidered, Zari, Gota, Lace, Printed, Scalloped' },
          { name: 'Hemline', options: 'Straight, Curved, Asymmetric, High-Low, Scalloped, Layered, Ruffled' },
          { name: 'Slit Styles', options: 'Side Slit, Front Slit, Back Slit, Both Sides, Curved, Layered' },
          { name: 'Back Design', options: 'Plain, Deep Back, Keyhole, V-Back, Embroidered, Tie-Up, Button Back' },
          { name: 'Yoke Style', options: 'Round, Square, V-Yoke, Curved, Embroidered, Pleated, Smocked' },
          { name: 'Placket', options: 'Center, Side, Hidden, Contrast, Button, Loop, Zipper, Tie-Up' },
          { name: 'Cuff Style', options: 'Plain, Contrast, Embroidered, Buttoned, Elastic, Ruffle, Lace' },
          { name: 'Pocket Style', options: 'Side Seam, Patch, Welt, Hidden, Kangaroo, Decorative' },
          { name: 'Closure Type', options: 'Pullover, Front/Back/Side Button, Zipper, Tie-Up, Hook & Eye' },
          { name: 'Lining', options: 'Unlined, Fully Lined, Half Lined, Cotton, Silk, Santoon Lining' },
          { name: 'Panel Design', options: 'Side Panels, Front Panels, Princess, Godet, Contrast, Pleated' },
        ]
      },
      {
        name: 'Occasion & Season',
        factors: [
          { name: 'Occasions', options: 'Wedding, Festive, Party, Office, Casual, Daily Wear, Formal, Religious, Bridal' },
          { name: 'Seasons', options: 'Summer, Winter, Monsoon, Spring, All Season, Festive Season' },
        ]
      },
      {
        name: 'Model Display',
        factors: [
          { name: 'Skin Tone', options: 'Fair, Light, Wheatish, Medium, Dusky, Dark, Very Fair, Very Dark' },
          { name: 'Height', options: 'Petite (under 5\'2"), Average (5\'3"-5\'6"), Tall (5\'7"-5\'10"), Very Tall (5\'11"+)' },
          { name: 'Pose', options: 'Front Standing, Side View, 3/4 View, Walking, Sitting, Traditional Pose' },
        ]
      },
    ],
    promptSettingsData: [
      { 
        name: 'Prompt Style', 
        options: [
          { label: 'Short', desc: 'Concise prompt for quick generation' },
          { label: 'Detailed', desc: 'Comprehensive prompt with all selected options organized by category' },
          { label: 'Professional', desc: 'Formal specification format with sections and technical details' },
        ]
      },
      { 
        name: 'Layout Mode', 
        options: [
          { label: 'Single', desc: 'One kurti - full frontal view on model' },
          { label: 'Front & Back', desc: '1×2 collage showing front and back views' },
          { label: '4 Variations', desc: '2×2 grid with 4 different color/style variations' },
          { label: 'Full View', desc: '2×2 collage for 360° perspectives (front, back, sides)' },
        ]
      },
      { 
        name: 'Language', 
        options: [
          { label: 'English', desc: 'Generate prompt in English' },
          { label: 'Hindi', desc: 'Generate prompt in Hindi (हिंदी)' },
        ]
      },
    ],
  },
  hi: {
    title: 'संपूर्ण उपयोगकर्ता गाइड',
    langLabel: 'English',
    overview: {
      title: 'कुर्ती प्रॉम्प्ट स्टूडियो क्या है?',
      desc: 'कुर्ती प्रॉम्प्ट स्टूडियो एक शक्तिशाली टूल है जो AI इमेज जनरेटर के लिए विस्तृत, पेशेवर प्रॉम्प्ट बनाने में मदद करता है। 900+ डिज़ाइन विकल्पों और 500+ मोटिफ के साथ, आप अपनी कुर्ती डिज़ाइन की हर डिटेल निर्दिष्ट कर सकते हैं और किसी भी AI इमेज टूल के लिए तैयार प्रॉम्प्ट प्राप्त कर सकते हैं।',
    },
    workflow: {
      title: '3-चरण वर्कफ़्लो',
      step1: {
        title: 'होम पेज',
        action: 'क्लिक करें',
        button: 'डिज़ाइनिंग शुरू करें',
        buttonEnd: 'बटन पर',
        whatSee: 'आप क्या देखेंगे:',
        whatSeeDesc: 'फीचर्स का ओवरव्यू, कैसे काम करता है गाइड, और फीचर हाइलाइट्स के साथ स्वागत पेज',
      },
      step2: {
        title: 'डिज़ाइन चयन',
        features: [
          { name: 'क्विक प्रीसेट्स', desc: 'शादी, त्योहार, पार्टी, ऑफिस, कैजुअल, मिनिमल' },
          { name: 'रैंडमाइज़ बटन', desc: 'प्रेरणा के लिए रैंडम कॉम्बिनेशन जनरेट करें' },
          { name: 'सर्च बार', desc: 'फ़िल्टर के साथ किसी भी डिज़ाइन विकल्प को तुरंत खोजें' },
          { name: 'हिंदी लेबल टॉगल', desc: 'अंग्रेज़ी + हिंदी में विकल्प देखें' },
        ],
        howToUse: 'कैसे उपयोग करें:',
        steps: [
          { text: 'उपयोग करें', badge: 'क्विक प्रीसेट्स', text2: 'या', badge2: 'रैंडमाइज़', text3: 'तेज़ सेटअप के लिए' },
          { text: 'श्रेणियों पर क्लिक करके उन्हें विस्तारित करें' },
          { text: 'प्रत्येक श्रेणी में कई विकल्प चुनें' },
          { text: 'उपयोग करें', badge: 'खोज', text2: 'विशिष्ट विकल्प खोजने के लिए' },
          { text: 'क्लिक करें', badge: 'सब रीसेट करें', text2: 'फिर से शुरू करने के लिए' },
          { text: 'क्लिक करें', badge: 'जनरेट पर जाएं', text2: 'जब तैयार हों' },
        ],
      },
      step3: {
        title: 'प्रॉम्प्ट जनरेट करें',
        features: [
          { name: 'प्रॉम्प्ट स्टाइल चुनें', desc: 'शॉर्ट, डिटेल्ड, या प्रोफेशनल' },
          { name: 'लेआउट मोड चुनें', desc: 'सिंगल, फ्रंट & बैक, 4 वेरिएशन, फुल व्यू' },
        ],
        howToUse: 'कैसे उपयोग करें:',
        steps: [
          'प्रॉम्प्ट स्टाइल चुनें (शॉर्ट/डिटेल्ड/प्रोफेशनल)',
          'अपनी इमेज के लिए लेआउट मोड चुनें',
          { text: 'क्लिक करें', badge: 'प्रॉम्प्ट जनरेट करें' },
          'जनरेट किया गया प्रॉम्प्ट देखें',
          { text: 'क्लिक करें', badge: 'प्रॉम्प्ट कॉपी करें' },
          'ChatGPT, Midjourney, DALL-E, या किसी भी AI इमेज टूल में पेस्ट करें',
        ],
      },
    },
    factors: {
      title: 'सभी डिज़ाइन फैक्टर्स (900+ विकल्प)',
      groups: 'समूह',
    },
    promptSettings: {
      title: 'प्रॉम्प्ट सेटिंग्स की व्याख्या',
    },
    tips: {
      title: 'प्रो टिप्स',
      items: [
        { bold: 'प्रीसेट्स से शुरू करें:', text: 'बेस डिज़ाइन जल्दी सेट करने के लिए क्विक प्रीसेट्स का उपयोग करें, फिर व्यक्तिगत विकल्पों को कस्टमाइज़ करें' },
        { bold: 'रैंडमाइज़ का उपयोग करें:', text: 'नए डिज़ाइन कॉम्बिनेशन खोजने के लिए रैंडमाइज़ बटन पर क्लिक करें जिनके बारे में आपने सोचा नहीं होगा' },
        { bold: 'सर्च फीचर:', text: '"चिकनकारी" या "अनारकली" जैसे विशिष्ट विकल्पों को जल्दी खोजने के लिए सर्च बार का उपयोग करें' },
        { bold: 'कम ज़्यादा है:', text: 'आपको हर श्रेणी भरने की ज़रूरत नहीं है - AI केंद्रित, स्पष्ट निर्देशों के साथ बेहतर काम करता है' },
        { bold: 'लेआउट मोड:', text: 'कैटलॉग-स्टाइल 360° इमेज के लिए "फुल व्यू", कलर ऑप्शंस के लिए "4 वेरिएशन" का उपयोग करें' },
        { bold: 'हिंदी प्रॉम्प्ट:', text: 'कुछ AI टूल्स प्रामाणिक भारतीय डिज़ाइनों के लिए हिंदी विवरण के साथ बेहतर काम करते हैं' },
      ],
    },
    categories: [
      {
        name: 'रंग और पैलेट',
        factors: [
          { name: 'रंग समूह', options: 'लाल, गुलाबी, नारंगी, पीला, हरा, नीला, बैंगनी, न्यूट्रल, मेटैलिक, पेस्टल, सफ़ेद, काला (80+ शेड्स)' },
          { name: 'कस्टम रंग', options: 'कोई भी कस्टम रंग नाम दर्ज करें' },
          { name: 'रंग संयोजन', options: 'मोनोक्रोम, ड्यूल टोन, ट्राई कलर, ओम्ब्रे, कंट्रास्ट, रेनबो' },
        ]
      },
      {
        name: 'कपड़ा और सामग्री',
        factors: [
          { name: 'कॉटन के प्रकार', options: 'शुद्ध कॉटन, हैंडलूम, स्लब, कॉटन सिल्क, खादी, ऑर्गेनिक, जैक्वार्ड' },
          { name: 'सिल्क की किस्में', options: 'शुद्ध सिल्क, आर्ट सिल्क, रॉ सिल्क, तुस्सार, बनारसी, कांजीवरम, पटोला, मैसूर, चंदेरी' },
          { name: 'अन्य कपड़े', options: 'रेयॉन, लिनन, जॉर्जेट, क्रेप, चंदेरी, ऑर्गेंज़ा, नेट, वेलवेट, ब्रोकेड, साटन, मसलिन' },
        ]
      },
      {
        name: 'सिल्हूट और संरचना',
        factors: [
          { name: 'क्लासिक कट', options: 'स्ट्रेट कट, ए-लाइन, फिटेड, सेमी-फिटेड, फ्लेयर्ड, लूज़ फिट' },
          { name: 'पारंपरिक', options: 'अनारकली, अंगरखा, प्रिंसेस कट, एम्पायर लाइन, पेप्लम, मरमेड, अम्ब्रेला कट' },
          { name: 'आधुनिक स्टाइल', options: 'काफ्तान, शर्ट स्टाइल, ट्यूनिक, जैकेट स्टाइल, रैप, लेयर्ड, असममित' },
          { name: 'लंबाई के विकल्प', options: 'हिप लंबाई, कमर लंबाई, घुटने की लंबाई, पिंडली की लंबाई, टखने की लंबाई, फ़्लोर लंबाई' },
        ]
      },
      {
        name: 'नेकलाइन डिज़ाइन',
        factors: [
          { name: 'गोल और यू-नेक', options: 'राउंड नेक, डीप राउंड, यू-नेक, स्कूप नेक' },
          { name: 'वी-नेक स्टाइल', options: 'वी-नेक, डीप वी, स्वीटहार्ट, नॉच्ड वी' },
          { name: 'स्क्वायर और बोट', options: 'स्क्वायर नेक, वाइड स्क्वायर, बोट नेक, बातो' },
          { name: 'कॉलर के प्रकार', options: 'मंदारिन, चाइनीज़, बैंड, पीटर पैन, नेहरू, शर्ट कॉलर, स्टैंड कॉलर' },
          { name: 'विशेष नेकलाइन', options: 'कीहोल, टियरड्रॉप, हॉल्टर, हाई नेक, टर्टल नेक, काउल नेक' },
        ]
      },
      {
        name: 'आस्तीन स्टाइल',
        factors: [
          { name: 'लंबाई के अनुसार', options: 'स्लीवलेस, कैप, शॉर्ट, एल्बो, 3/4, फुल, एक्स्ट्रा लॉन्ग' },
          { name: 'आकार वाली आस्तीन', options: 'बेल, फ़्लटर, पफ, बलून, लैंटर्न, बिशप, ट्रंपेट' },
          { name: 'विशेष स्टाइल', options: 'कोल्ड शोल्डर, ऑफ शोल्डर, रैगलन, किमोनो, डोलमैन, केप' },
          { name: 'सजावटी', options: 'स्लिट, लेयर्ड, टियर्ड, रफ़ल्ड, लेस स्लीव्स, एम्ब्रॉइडर्ड कफ' },
        ]
      },
      {
        name: 'कढ़ाई और हस्तकला',
        factors: [
          { name: 'पारंपरिक', options: 'चिकनकारी, लखनवी, फुलकारी, कंथा, कशीदा, आरी, ज़रदोज़ी, गोटा पट्टी, दबका' },
          { name: 'धागे का काम', options: 'रेशम, फ्रेंच नॉट, क्रॉस स्टिच, चेन स्टिच, साटन स्टिच, शैडो वर्क' },
          { name: 'धातु का काम', options: 'ज़री वर्क, गोल्ड ज़री, सिल्वर ज़री, कॉपर ज़री, एंटीक ज़री' },
          { name: 'सजावटी', options: 'मिरर, सीक्विन, बीड, पर्ल, स्टोन, कुंदन, क्रिस्टल वर्क' },
          { name: 'घनत्व विकल्प', options: 'हल्का, मध्यम, भारी कवरेज' },
        ]
      },
      {
        name: 'प्रिंट तकनीक',
        factors: [
          { name: 'ब्लॉक प्रिंट', options: 'हैंड ब्लॉक, दाबू, बागरू, अजरख, सांगानेरी प्रिंट' },
          { name: 'कला प्रिंट', options: 'कलमकारी, मधुबनी, वारली, पिछवाई प्रिंट' },
          { name: 'रेज़िस्ट प्रिंट', options: 'टाई-डाई, बंधनी, लहरिया, शिबोरी, बाटिक' },
          { name: 'आधुनिक प्रिंट', options: 'डिजिटल, स्क्रीन, फ़ॉइल, फ्लॉक, सब्लिमेशन प्रिंट' },
          { name: 'पैटर्न प्रिंट', options: 'इकत, पटोला, ज्यामितीय, एब्स्ट्रैक्ट, फ्लोरल, पैस्ले, ट्राइबल' },
        ]
      },
      {
        name: 'डिज़ाइन मोटिफ (500+)',
        factors: [
          { name: 'फ्लोरल', options: '80+ फूल जिनमें गुलाब, कमल, चमेली, गेंदा, लिली, गुड़हल शामिल हैं' },
          { name: 'पारंपरिक', options: '50+ पैस्ले, बूटा, जाल पैटर्न' },
          { name: 'ज्यामितीय', options: '40+ आकार जिनमें शेवरॉन, मंडला, लैटिस शामिल हैं' },
          { name: 'सांस्कृतिक', options: '60+ मंदिर, मुगल, राजस्थानी मोटिफ' },
          { name: 'प्रकृति', options: '50+ मोर, हाथी, पक्षी, पत्ती डिज़ाइन' },
          { name: 'एब्स्ट्रैक्ट', options: '40+ समकालीन और आधुनिक पैटर्न' },
        ]
      },
      {
        name: 'निर्माण विवरण',
        factors: [
          { name: 'बॉर्डर स्टाइल', options: 'सादा, कंट्रास्ट, एम्ब्रॉइडर्ड, ज़री, गोटा, लेस, प्रिंटेड, स्कैलप्ड' },
          { name: 'हेमलाइन', options: 'स्ट्रेट, कर्व्ड, असममित, हाई-लो, स्कैलप्ड, लेयर्ड, रफ़ल्ड' },
          { name: 'स्लिट स्टाइल', options: 'साइड स्लिट, फ्रंट स्लिट, बैक स्लिट, दोनों तरफ, कर्व्ड, लेयर्ड' },
          { name: 'बैक डिज़ाइन', options: 'सादा, डीप बैक, कीहोल, वी-बैक, एम्ब्रॉइडर्ड, टाई-अप, बटन बैक' },
          { name: 'योक स्टाइल', options: 'गोल, स्क्वायर, वी-योक, कर्व्ड, एम्ब्रॉइडर्ड, प्लीटेड, स्मॉक्ड' },
          { name: 'प्लैकेट', options: 'सेंटर, साइड, हिडन, कंट्रास्ट, बटन, लूप, ज़िपर, टाई-अप' },
          { name: 'कफ स्टाइल', options: 'सादा, कंट्रास्ट, एम्ब्रॉइडर्ड, बटनयुक्त, इलास्टिक, रफ़ल, लेस' },
          { name: 'पॉकेट स्टाइल', options: 'साइड सीम, पैच, वेल्ट, हिडन, कंगारू, सजावटी' },
          { name: 'क्लोज़र का प्रकार', options: 'पुलओवर, फ्रंट/बैक/साइड बटन, ज़िपर, टाई-अप, हुक और आई' },
          { name: 'लाइनिंग', options: 'अनलाइन्ड, फुल्ली लाइन्ड, हाफ लाइन्ड, कॉटन, सिल्क, सैंटून लाइनिंग' },
          { name: 'पैनल डिज़ाइन', options: 'साइड पैनल, फ्रंट पैनल, प्रिंसेस, गोडेट, कंट्रास्ट, प्लीटेड' },
        ]
      },
      {
        name: 'अवसर और मौसम',
        factors: [
          { name: 'अवसर', options: 'शादी, त्योहार, पार्टी, ऑफिस, कैजुअल, डेली वियर, फॉर्मल, धार्मिक, ब्राइडल' },
          { name: 'मौसम', options: 'गर्मी, सर्दी, मानसून, वसंत, ऑल सीज़न, त्योहारी मौसम' },
        ]
      },
      {
        name: 'मॉडल डिस्प्ले',
        factors: [
          { name: 'त्वचा का रंग', options: 'गोरा, हल्का, गेहुंआ, मध्यम, सांवला, गहरा, बहुत गोरा, बहुत गहरा' },
          { name: 'ऊंचाई', options: 'छोटी (5\'2" से कम), औसत (5\'3"-5\'6"), लंबी (5\'7"-5\'10"), बहुत लंबी (5\'11"+)' },
          { name: 'पोज़', options: 'सामने खड़ी, साइड व्यू, 3/4 व्यू, चलती हुई, बैठी हुई, पारंपरिक पोज़' },
        ]
      },
    ],
    promptSettingsData: [
      { 
        name: 'प्रॉम्प्ट स्टाइल', 
        options: [
          { label: 'शॉर्ट', desc: 'त्वरित जनरेशन के लिए संक्षिप्त प्रॉम्प्ट' },
          { label: 'डिटेल्ड', desc: 'श्रेणी के अनुसार सभी चयनित विकल्पों के साथ व्यापक प्रॉम्प्ट' },
          { label: 'प्रोफेशनल', desc: 'सेक्शन और तकनीकी विवरण के साथ औपचारिक विनिर्देश प्रारूप' },
        ]
      },
      { 
        name: 'लेआउट मोड', 
        options: [
          { label: 'सिंगल', desc: 'एक कुर्ती - मॉडल पर पूर्ण फ्रंटल व्यू' },
          { label: 'फ्रंट & बैक', desc: 'फ्रंट और बैक व्यू दिखाने वाला 1×2 कोलाज' },
          { label: '4 वेरिएशन', desc: '4 अलग-अलग कलर/स्टाइल वेरिएशन के साथ 2×2 ग्रिड' },
          { label: 'फुल व्यू', desc: '360° परिप्रेक्ष्य के लिए 2×2 कोलाज (फ्रंट, बैक, साइड्स)' },
        ]
      },
      { 
        name: 'भाषा', 
        options: [
          { label: 'अंग्रेज़ी', desc: 'अंग्रेज़ी में प्रॉम्प्ट जनरेट करें' },
          { label: 'हिंदी', desc: 'हिंदी में प्रॉम्प्ट जनरेट करें' },
        ]
      },
    ],
  },
};

const categoryIcons = [PaintBucket, Layers, Shirt, Scissors, Shirt, Brush, Palette, Star, Scissors, Sparkles, User];

export const UserGuide: React.FC<UserGuideProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHindi, setIsHindi] = useState(false);

  const t = isHindi ? translations.hi : translations.en;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Guide</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <img src={logoImage} alt="KPS" className="w-10 h-10 rounded-lg" />
              {t.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <Switch
                id="guide-lang"
                checked={isHindi}
                onCheckedChange={setIsHindi}
              />
              <Label htmlFor="guide-lang" className="text-sm font-medium cursor-pointer">
                {t.langLabel}
              </Label>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 h-[calc(90vh-100px)]">
          <div className="p-6 space-y-8">
            
            {/* Website Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                {t.overview.title}
              </h2>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t.overview.desc}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 3-Step Workflow */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ChevronRight className="w-6 h-6 text-primary" />
                {t.workflow.title}
              </h2>
              
              <div className="space-y-4">
                {/* Step 1 */}
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
                      <Home className="w-5 h-5 text-muted-foreground" />
                      {t.workflow.step1.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p>{t.workflow.step1.action} <Badge variant="default">{t.workflow.step1.button}</Badge> {t.workflow.step1.buttonEnd}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm">
                      <strong>{t.workflow.step1.whatSee}</strong> {t.workflow.step1.whatSeeDesc}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-muted-foreground" />
                </div>

                {/* Step 2 */}
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
                      <Settings2 className="w-5 h-5 text-muted-foreground" />
                      {t.workflow.step2.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {t.workflow.step2.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{feature.name}</p>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg text-sm">
                      <strong>{t.workflow.step2.howToUse}</strong>
                      <ol className="mt-2 space-y-1 list-decimal list-inside">
                        {t.workflow.step2.steps.map((step, idx) => (
                          <li key={idx}>
                            {typeof step === 'string' ? step : (
                              <>
                                {step.text} <Badge variant="secondary">{step.badge}</Badge>
                                {step.text2 && <> {step.text2}</>}
                                {step.badge2 && <> <Badge variant="secondary"><Wand2 className="w-3 h-3 inline" /> {step.badge2}</Badge></>}
                                {step.text3 && <> {step.text3}</>}
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-muted-foreground" />
                </div>

                {/* Step 3 */}
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      {t.workflow.step3.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {t.workflow.step3.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Circle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{feature.name}</p>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg text-sm">
                      <strong>{t.workflow.step3.howToUse}</strong>
                      <ol className="mt-2 space-y-1 list-decimal list-inside">
                        {t.workflow.step3.steps.map((step, idx) => (
                          <li key={idx}>
                            {typeof step === 'string' ? step : (
                              <>
                                {step.text} <Badge variant="default"><Sparkles className="w-3 h-3 inline" /> {step.badge}</Badge>
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* All Design Factors */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-primary" />
                {t.factors.title}
              </h2>
              
              <Accordion type="multiple" className="space-y-2">
                {t.categories.map((category, index) => {
                  const Icon = categoryIcons[index] || Palette;
                  return (
                    <AccordionItem key={index} value={`category-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold">{category.name}</span>
                          <Badge variant="outline" className="ml-2">{category.factors.length} {t.factors.groups}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {category.factors.map((factor, fIndex) => (
                            <div key={fIndex} className="bg-muted/30 p-3 rounded-lg">
                              <p className="font-medium text-sm mb-1">{factor.name}</p>
                              <p className="text-xs text-muted-foreground">{factor.options}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>

            {/* Prompt Settings */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings2 className="w-6 h-6 text-primary" />
                {t.promptSettings.title}
              </h2>
              
              <div className="space-y-4">
                {t.promptSettingsData.map((setting, index) => {
                  const icons = [FileText, Grid2X2, Languages];
                  const Icon = icons[index];
                  return (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className="w-5 h-5 text-primary" />
                          {setting.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {setting.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-start gap-2 bg-muted/30 p-3 rounded-lg">
                              <Badge variant="secondary" className="mt-0.5">{option.label}</Badge>
                              <p className="text-sm text-muted-foreground">{option.desc}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Tips & Tricks */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-primary" />
                {t.tips.title}
              </h2>
              
              <Card>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {t.tips.items.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>{tip.bold}</strong> {tip.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
