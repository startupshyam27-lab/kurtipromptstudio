import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    'app.title': 'Kurti Prompt Studio',
    'app.tagline': 'Design your kurti with prompts',
    
    // Home
    'home.hero.title': 'Create Perfect AI Prompts for Kurti Design',
    'home.hero.subtitle': 'Generate detailed, professional prompts for any AI image generator. No API keys needed!',
    'home.start': 'Start Designing',
    'home.howItWorks': 'How It Works',
    'home.step1.title': 'Select Design Factors',
    'home.step1.desc': 'Choose from 400+ design options - colors, fabrics, embroidery, necklines and more',
    'home.step2.title': 'Preview Your Prompt',
    'home.step2.desc': 'See your design choices converted into a detailed AI-ready prompt in real-time',
    'home.step3.title': 'Copy & Generate',
    'home.step3.desc': 'Copy the prompt and paste it into Midjourney, DALL-E, or any AI image tool',
    'home.features.title': 'Why Use Kurti Prompt Studio?',
    'home.feature1.title': 'No AI Knowledge Needed',
    'home.feature1.desc': 'We handle the prompt engineering for you',
    'home.feature2.title': '4 Kurtis in 1 Image',
    'home.feature2.desc': 'Get 4 design variations in a single generation',
    'home.feature3.title': '400+ Design Options',
    'home.feature3.desc': 'Comprehensive library of ethnic wear elements',
    'home.feature4.title': 'Works Everywhere',
    'home.feature4.desc': 'Compatible with all AI image generators',
    
    // Navigation
    'nav.home': 'Home',
    'nav.design': 'Design',
    'nav.generate': 'Generate',
    
    // Design Selector
    'design.title': 'Select Design Factors',
    'design.subtitle': 'Choose the options you want. Skip what you don\'t need.',
    'design.reset': 'Reset All',
    'design.selected': 'selected',
    'design.clearAll': 'Clear all',
    'design.customColor': 'Custom Color',
    'design.customColorPlaceholder': 'E.g., Dusty rose with gold accents',
    'design.embroideryDensity': 'Embroidery Density',
    
    // Categories
    'category.colorFabric': 'Color & Fabric',
    'category.colorPalette': 'Color Palette',
    'category.colorCombination': 'Color Combination',
    'category.fabric': 'Fabric',
    'category.liningType': 'Lining Type',
    'category.embroideryEmbellishments': 'Embroidery & Embellishments',
    'category.embroideryStyle': 'Embroidery Style',
    'category.embellishments': 'Embellishments',
    'category.borderStyle': 'Border Style',
    'category.printsPatterns': 'Prints & Patterns',
    'category.printTechnique': 'Print Technique',
    'category.motifPattern': 'Motif & Pattern',
    'category.silhouetteCut': 'Silhouette & Cut',
    'category.silhouette': 'Silhouette',
    'category.length': 'Length',
    'category.hemlineStyle': 'Hemline Style',
    'category.slitStyle': 'Slit Style',
    'category.necklineCollar': 'Neckline & Collar',
    'category.neckline': 'Neckline',
    'category.collarStyle': 'Collar Style',
    'category.placketStyle': 'Placket Style',
    'category.sleevesCuffs': 'Sleeves & Cuffs',
    'category.sleeves': 'Sleeves',
    'category.cuffStyle': 'Cuff Style',
    'category.constructionDetails': 'Construction Details',
    'category.yokeStyle': 'Yoke Style',
    'category.panelDesign': 'Panel Design',
    'category.backDesign': 'Back Design',
    'category.pocketStyle': 'Pocket Style',
    'category.closureType': 'Closure Type',
    'category.finishingDetails': 'Finishing Details',
    'category.occasionStyling': 'Occasion & Styling',
    'category.occasion': 'Occasion',
    'category.seasonalStyle': 'Seasonal Style',
    'category.bodyType': 'Body Type',
    'category.ageGroup': 'Age Group',
    
    // Density
    'density.light': 'Light',
    'density.medium': 'Medium',
    'density.heavy': 'Heavy',
    
    // Prompt Generator
    'prompt.title': 'Generated Prompt',
    'prompt.optionsSelected': 'options selected',
    'prompt.copy': 'Copy Prompt',
    'prompt.copied': 'Copied!',
    'prompt.style': 'Prompt Style',
    'prompt.short': 'Short',
    'prompt.detailed': 'Detailed',
    'prompt.professional': 'Professional',
    'prompt.empty': 'Select design factors to generate your prompt',
    'prompt.emptyHint': 'Start by choosing colors, fabrics, embroidery, and other design elements from the left panel.',
    
    // How to use
    'howTo.title': 'How to Use Your Prompt',
    'howTo.step1': 'Click the "Copy Prompt" button above',
    'howTo.step2': 'Open your preferred AI image generator (Midjourney, DALL-E, Stable Diffusion, etc.)',
    'howTo.step3': 'Paste the prompt and generate your kurti design!',
    
    // Footer
    'footer.text': 'Kurti Prompt Studio — Design your perfect kurti with AI-ready prompts',
  },
  hi: {
    // App
    'app.title': 'कुर्ती प्रॉम्प्ट स्टूडियो',
    'app.tagline': 'प्रॉम्प्ट से अपनी कुर्ती डिज़ाइन करें',
    
    // Home
    'home.hero.title': 'कुर्ती डिज़ाइन के लिए परफेक्ट AI प्रॉम्प्ट बनाएं',
    'home.hero.subtitle': 'किसी भी AI इमेज जनरेटर के लिए विस्तृत, प्रोफेशनल प्रॉम्प्ट बनाएं। कोई API कीज़ नहीं चाहिए!',
    'home.start': 'डिज़ाइन शुरू करें',
    'home.howItWorks': 'यह कैसे काम करता है',
    'home.step1.title': 'डिज़ाइन चुनें',
    'home.step1.desc': '400+ विकल्पों में से चुनें - रंग, कपड़े, कढ़ाई, नेकलाइन और भी बहुत कुछ',
    'home.step2.title': 'प्रॉम्प्ट देखें',
    'home.step2.desc': 'अपनी डिज़ाइन चॉइस को रियल-टाइम में AI-रेडी प्रॉम्प्ट में बदलते देखें',
    'home.step3.title': 'कॉपी और जनरेट करें',
    'home.step3.desc': 'प्रॉम्प्ट कॉपी करें और Midjourney, DALL-E या किसी AI टूल में पेस्ट करें',
    'home.features.title': 'कुर्ती प्रॉम्प्ट स्टूडियो क्यों?',
    'home.feature1.title': 'AI ज्ञान की ज़रूरत नहीं',
    'home.feature1.desc': 'प्रॉम्प्ट इंजीनियरिंग हम संभालते हैं',
    'home.feature2.title': '1 इमेज में 4 कुर्ती',
    'home.feature2.desc': 'एक ही जनरेशन में 4 डिज़ाइन वेरिएशन',
    'home.feature3.title': '400+ डिज़ाइन विकल्प',
    'home.feature3.desc': 'एथनिक वियर एलिमेंट्स की विस्तृत लाइब्रेरी',
    'home.feature4.title': 'हर जगह काम करता है',
    'home.feature4.desc': 'सभी AI इमेज जनरेटर के साथ संगत',
    
    // Navigation
    'nav.home': 'होम',
    'nav.design': 'डिज़ाइन',
    'nav.generate': 'जनरेट',
    
    // Design Selector
    'design.title': 'डिज़ाइन विकल्प चुनें',
    'design.subtitle': 'अपनी पसंद के विकल्प चुनें। जो नहीं चाहिए उसे छोड़ दें।',
    'design.reset': 'सब रीसेट करें',
    'design.selected': 'चयनित',
    'design.clearAll': 'सब हटाएं',
    'design.customColor': 'कस्टम रंग',
    'design.customColorPlaceholder': 'जैसे: गोल्डन एक्सेंट के साथ डस्टी रोज़',
    'design.embroideryDensity': 'कढ़ाई की मात्रा',
    
    // Categories
    'category.colorFabric': 'रंग और कपड़ा',
    'category.colorPalette': 'रंग पैलेट',
    'category.colorCombination': 'रंग संयोजन',
    'category.fabric': 'कपड़ा',
    'category.liningType': 'अस्तर का प्रकार',
    'category.embroideryEmbellishments': 'कढ़ाई और सजावट',
    'category.embroideryStyle': 'कढ़ाई शैली',
    'category.embellishments': 'सजावट',
    'category.borderStyle': 'बॉर्डर शैली',
    'category.printsPatterns': 'प्रिंट और पैटर्न',
    'category.printTechnique': 'प्रिंट तकनीक',
    'category.motifPattern': 'मोटिफ और पैटर्न',
    'category.silhouetteCut': 'सिल्हूट और कट',
    'category.silhouette': 'सिल्हूट',
    'category.length': 'लंबाई',
    'category.hemlineStyle': 'हेमलाइन शैली',
    'category.slitStyle': 'स्लिट शैली',
    'category.necklineCollar': 'नेकलाइन और कॉलर',
    'category.neckline': 'नेकलाइन',
    'category.collarStyle': 'कॉलर शैली',
    'category.placketStyle': 'प्लैकेट शैली',
    'category.sleevesCuffs': 'आस्तीन और कफ',
    'category.sleeves': 'आस्तीन',
    'category.cuffStyle': 'कफ शैली',
    'category.constructionDetails': 'निर्माण विवरण',
    'category.yokeStyle': 'योक शैली',
    'category.panelDesign': 'पैनल डिज़ाइन',
    'category.backDesign': 'पीछे का डिज़ाइन',
    'category.pocketStyle': 'पॉकेट शैली',
    'category.closureType': 'क्लोज़र प्रकार',
    'category.finishingDetails': 'फिनिशिंग विवरण',
    'category.occasionStyling': 'अवसर और स्टाइलिंग',
    'category.occasion': 'अवसर',
    'category.seasonalStyle': 'मौसमी शैली',
    'category.bodyType': 'शरीर का प्रकार',
    'category.ageGroup': 'आयु वर्ग',
    
    // Density
    'density.light': 'हल्की',
    'density.medium': 'मध्यम',
    'density.heavy': 'भारी',
    
    // Prompt Generator
    'prompt.title': 'जनरेट किया गया प्रॉम्प्ट',
    'prompt.optionsSelected': 'विकल्प चुने गए',
    'prompt.copy': 'प्रॉम्प्ट कॉपी करें',
    'prompt.copied': 'कॉपी हो गया!',
    'prompt.style': 'प्रॉम्प्ट शैली',
    'prompt.short': 'संक्षिप्त',
    'prompt.detailed': 'विस्तृत',
    'prompt.professional': 'प्रोफेशनल',
    'prompt.empty': 'प्रॉम्प्ट जनरेट करने के लिए डिज़ाइन विकल्प चुनें',
    'prompt.emptyHint': 'बाएं पैनल से रंग, कपड़े, कढ़ाई और अन्य डिज़ाइन एलिमेंट चुनकर शुरू करें।',
    
    // How to use
    'howTo.title': 'अपना प्रॉम्प्ट कैसे उपयोग करें',
    'howTo.step1': 'ऊपर "प्रॉम्प्ट कॉपी करें" बटन पर क्लिक करें',
    'howTo.step2': 'अपना पसंदीदा AI इमेज जनरेटर खोलें (Midjourney, DALL-E, Stable Diffusion, आदि)',
    'howTo.step3': 'प्रॉम्प्ट पेस्ट करें और अपनी कुर्ती डिज़ाइन जनरेट करें!',
    
    // Footer
    'footer.text': 'कुर्ती प्रॉम्प्ट स्टूडियो — AI-रेडी प्रॉम्प्ट से अपनी परफेक्ट कुर्ती डिज़ाइन करें',
  }
};

// Hindi translations for design options
export const DESIGN_OPTIONS_HI: Record<string, Record<string, string>> = {
  color: {
    'Pastel Pink': 'पेस्टल गुलाबी', 'Pastel Blue': 'पेस्टल नीला', 'Pastel Green': 'पेस्टल हरा', 
    'Pastel Yellow': 'पेस्टल पीला', 'Pastel Lavender': 'पेस्टल लैवेंडर', 'Pastel Peach': 'पेस्टल पीच', 
    'Pastel Mint': 'पेस्टल मिंट', 'Bright Red': 'चमकीला लाल', 'Bright Orange': 'चमकीला नारंगी', 
    'Bright Yellow': 'चमकीला पीला', 'Bright Green': 'चमकीला हरा', 'Bright Blue': 'चमकीला नीला', 
    'Bright Pink': 'चमकीला गुलाबी', 'Bright Purple': 'चमकीला बैंगनी', 'Dark Maroon': 'गहरा मैरून', 
    'Dark Navy': 'गहरा नेवी', 'Dark Green': 'गहरा हरा', 'Dark Brown': 'गहरा भूरा', 
    'Dark Grey': 'गहरा स्लेटी', 'Black': 'काला', 'Dark Wine': 'गहरा वाइन', 'Dark Teal': 'गहरा टील',
    'Dual-tone': 'दो रंग', 'Multi-color': 'बहुरंगी', 'Ombre': 'ओम्ब्रे', 'Gradient': 'ग्रेडिएंट',
    'Royal Blue': 'रॉयल नीला', 'Emerald Green': 'पन्ना हरा', 'Ruby Red': 'माणिक लाल', 
    'Sapphire Blue': 'नीलम नीला', 'Golden Yellow': 'सुनहरा पीला', 'Rose Gold': 'रोज़ गोल्ड', 
    'Silver Grey': 'चांदी स्लेटी', 'Ivory': 'हाथीदांत', 'Cream': 'क्रीम', 'Beige': 'बेज', 
    'Off-White': 'ऑफ-व्हाइट', 'Pure White': 'शुद्ध सफेद', 'Coral': 'कोरल', 'Turquoise': 'फ़िरोज़ा', 
    'Magenta': 'मैजेंटा', 'Mustard': 'सरसों'
  },
  fabric: {
    'Pure Cotton': 'शुद्ध कॉटन', 'Handloom Cotton': 'हैंडलूम कॉटन', 'Slub Cotton': 'स्लब कॉटन',
    'Cotton Silk': 'कॉटन सिल्क', 'Cotton Linen': 'कॉटन लिनन', 'Khadi Cotton': 'खादी कॉटन',
    'Organic Cotton': 'ऑर्गेनिक कॉटन', 'Jacquard Cotton': 'जैक्वार्ड कॉटन', 'Pure Silk': 'शुद्ध सिल्क',
    'Art Silk': 'आर्ट सिल्क', 'Raw Silk': 'रॉ सिल्क', 'Tussar Silk': 'तुसर सिल्क',
    'Banarasi Silk': 'बनारसी सिल्क', 'Kanjivaram Silk': 'कांजीवरम सिल्क', 'Patola Silk': 'पटोला सिल्क',
    'Mysore Silk': 'मैसूर सिल्क', 'Chanderi Silk': 'चंदेरी सिल्क', 'Rayon': 'रेयॉन',
    'Modal Rayon': 'मॉडल रेयॉन', 'Viscose Rayon': 'विस्कोस रेयॉन', 'Rayon Crepe': 'रेयॉन क्रेप',
    'Pure Linen': 'शुद्ध लिनन', 'Linen Blend': 'लिनन ब्लेंड', 'Handloom Linen': 'हैंडलूम लिनन',
    'Georgette': 'जॉर्जेट', 'Faux Georgette': 'फॉक्स जॉर्जेट', 'Heavy Georgette': 'हेवी जॉर्जेट',
    'Chiffon Georgette': 'शिफॉन जॉर्जेट', 'Crepe': 'क्रेप', 'Moss Crepe': 'मॉस क्रेप',
    'Satin Crepe': 'सैटिन क्रेप', 'French Crepe': 'फ्रेंच क्रेप', 'Chanderi': 'चंदेरी',
    'Maheshwari': 'महेश्वरी', 'Kota Doria': 'कोटा डोरिया', 'Organza': 'ऑर्गेन्ज़ा',
    'Net': 'नेट', 'Velvet': 'वेलवेट', 'Brocade': 'ब्रोकेड', 'Jacquard': 'जैक्वार्ड',
    'Satin': 'सैटिन', 'Lycra Blend': 'लाइक्रा ब्लेंड', 'Muslin': 'मलमल', 'Cambric': 'कैंब्रिक'
  },
  embroidery: {
    'Chikankari': 'चिकनकारी', 'Lucknowi Chikan': 'लखनवी चिकन', 'Phulkari': 'फुलकारी',
    'Kantha': 'कांथा', 'Kashida': 'कशीदा', 'Aari': 'आरी', 'Zardozi': 'ज़रदोज़ी',
    'Gota Patti': 'गोटा पट्टी', 'Dabka': 'डबका', 'Thread Work': 'धागे का काम',
    'Resham Work': 'रेशम का काम', 'French Knot': 'फ्रेंच नॉट', 'Cross Stitch': 'क्रॉस स्टिच',
    'Chain Stitch': 'चेन स्टिच', 'Satin Stitch': 'सैटिन स्टिच', 'Shadow Work': 'शैडो वर्क',
    'Zari Work': 'ज़री का काम', 'Gold Zari': 'सुनहरी ज़री', 'Silver Zari': 'चांदी ज़री',
    'Copper Zari': 'तांबे की ज़री', 'Antique Zari': 'एंटीक ज़री', 'Mirror Work': 'शीशे का काम',
    'Sequin Work': 'सीक्विन वर्क', 'Bead Work': 'मोती का काम', 'Pearl Work': 'मोती का काम',
    'Stone Work': 'पत्थर का काम', 'Kundan Work': 'कुंदन का काम', 'Crystal Work': 'क्रिस्टल वर्क',
    'Cutwork': 'कटवर्क', 'Applique': 'एप्लिक', 'Patchwork': 'पैचवर्क',
    'Ribbon Work': 'रिबन वर्क', 'Laser Cut': 'लेज़र कट', '3D Embroidery': '3D कढ़ाई', 'None': 'कोई नहीं'
  },
  neckline: {
    'Round Neck': 'गोल गला', 'Deep Round': 'गहरा गोल', 'Shallow Round': 'छोटा गोल',
    'U-Neck': 'यू-नेक', 'Scoop Neck': 'स्कूप नेक', 'V-Neck': 'वी-नेक', 'Deep V-Neck': 'गहरा वी-नेक',
    'Sweetheart': 'स्वीटहार्ट', 'Notched V': 'नॉच्ड वी', 'Square Neck': 'स्क्वायर नेक',
    'Wide Square': 'चौड़ा स्क्वायर', 'Boat Neck': 'बोट नेक', 'Bateau Neck': 'बटू नेक',
    'Mandarin Collar': 'मंदारिन कॉलर', 'Chinese Collar': 'चाइनीज़ कॉलर', 'Band Collar': 'बैंड कॉलर',
    'Peter Pan Collar': 'पीटर पैन कॉलर', 'Nehru Collar': 'नेहरू कॉलर', 'Shirt Collar': 'शर्ट कॉलर',
    'Stand Collar': 'स्टैंड कॉलर', 'Keyhole': 'कीहोल', 'Teardrop': 'टियरड्रॉप',
    'Halter': 'हॉल्टर', 'High Neck': 'हाई नेक', 'Turtle Neck': 'टर्टल नेक', 'Cowl Neck': 'काउल नेक',
    'Embroidered Neckline': 'कढ़ाई वाला गला', 'Piping Neck': 'पाइपिंग नेक',
    'Lace Trim Neck': 'लेस ट्रिम नेक', 'Tassel Neck': 'टैसल नेक',
    'Button Placket': 'बटन प्लैकेट', 'Zari Border Neck': 'ज़री बॉर्डर नेक'
  },
  sleeves: {
    'Sleeveless': 'बिना आस्तीन', 'Cap Sleeves': 'कैप स्लीव्स', 'Short Sleeves': 'छोटी आस्तीन',
    'Elbow Length': 'कोहनी तक', '3/4 Sleeves': '3/4 आस्तीन', 'Full Sleeves': 'पूरी आस्तीन',
    'Extra Long': 'अतिरिक्त लंबी', 'Bell Sleeves': 'बेल स्लीव्स', 'Flutter Sleeves': 'फ्लटर स्लीव्स',
    'Puff Sleeves': 'पफ स्लीव्स', 'Balloon Sleeves': 'बैलून स्लीव्स', 'Lantern Sleeves': 'लालटेन स्लीव्स',
    'Bishop Sleeves': 'बिशप स्लीव्स', 'Trumpet Sleeves': 'ट्रंपेट स्लीव्स', 'Fitted Sleeves': 'फिटेड स्लीव्स',
    'Slim Sleeves': 'स्लिम स्लीव्स', 'Straight Sleeves': 'सीधी आस्तीन', 'Cold Shoulder': 'कोल्ड शोल्डर',
    'Off Shoulder': 'ऑफ शोल्डर', 'One Shoulder': 'वन शोल्डर', 'Raglan Sleeves': 'रैगलान स्लीव्स',
    'Kimono Sleeves': 'किमोनो स्लीव्स', 'Dolman Sleeves': 'डोलमन स्लीव्स', 'Cape Sleeves': 'केप स्लीव्स',
    'Slit Sleeves': 'स्लिट स्लीव्स', 'Layered Sleeves': 'लेयर्ड स्लीव्स', 'Tiered Sleeves': 'टियर्ड स्लीव्स',
    'Ruffled Sleeves': 'रफल्ड स्लीव्स', 'Embroidered Cuff': 'कढ़ाई वाला कफ', 'Lace Sleeves': 'लेस स्लीव्स'
  },
  occasion: {
    'Daily Wear': 'रोज़ाना पहनने के लिए', 'Casual Wear': 'कैज़ुअल वियर', 'Office Wear': 'ऑफिस वियर',
    'Work Wear': 'वर्क वियर', 'Formal Wear': 'फॉर्मल वियर', 'Festive Wear': 'त्योहार के लिए',
    'Diwali Special': 'दीवाली स्पेशल', 'Eid Special': 'ईद स्पेशल', 'Navratri Special': 'नवरात्रि स्पेशल',
    'Durga Puja Special': 'दुर्गा पूजा स्पेशल', 'Wedding Wear': 'शादी के लिए', 'Mehendi Ceremony': 'मेहंदी समारोह',
    'Sangeet': 'संगीत', 'Reception': 'रिसेप्शन', 'Wedding Guest': 'शादी का मेहमान',
    'Party Wear': 'पार्टी वियर', 'Evening Wear': 'ईवनिंग वियर', 'Cocktail Party': 'कॉकटेल पार्टी',
    'Date Night': 'डेट नाइट', 'Puja Wear': 'पूजा के लिए', 'Temple Wear': 'मंदिर के लिए',
    'Religious Function': 'धार्मिक कार्यक्रम', 'Family Gathering': 'पारिवारिक समारोह'
  },
  silhouette: {
    'Straight Cut': 'सीधा कट', 'A-Line': 'ए-लाइन', 'Fitted': 'फिटेड', 'Semi-Fitted': 'सेमी-फिटेड',
    'Relaxed Fit': 'रिलैक्स्ड फिट', 'Loose Fit': 'लूज़ फिट', 'Flared': 'फ्लेयर्ड',
    'Anarkali': 'अनारकली', 'Angrakha': 'अंगरखा', 'Princess Cut': 'प्रिंसेस कट', 'Empire Line': 'एम्पायर लाइन',
    'Peplum': 'पेप्लम', 'Mermaid': 'मरमेड', 'Umbrella Cut': 'अंब्रेला कट', 'Kaftan Style': 'काफ्तान स्टाइल',
    'Shirt Style': 'शर्ट स्टाइल', 'Tunic Style': 'ट्यूनिक स्टाइल', 'Jacket Style': 'जैकेट स्टाइल',
    'Overlap Style': 'ओवरलैप स्टाइल', 'Wrap Style': 'रैप स्टाइल', 'Layered': 'लेयर्ड',
    'Asymmetric': 'असमैट्रिक', 'Side Slit': 'साइड स्लिट', 'Front Slit': 'फ्रंट स्लिट',
    'Trail Cut': 'ट्रेल कट', 'Paneled': 'पैनल्ड', 'Tiered': 'टियर्ड'
  },
  length: {
    'Hip Length': 'कूल्हे तक', 'Short (Above Knee)': 'छोटी (घुटने से ऊपर)', 'Knee Length': 'घुटने तक',
    'Below Knee': 'घुटने के नीचे', 'Mid-Calf': 'पिंडली के बीच', 'Calf Length': 'पिंडली तक',
    'Ankle Length': 'टखने तक', 'Floor Length': 'फर्श तक', 'Asymmetric Length': 'असमैट्रिक लंबाई',
    'High-Low': 'हाई-लो', 'Front Short Back Long': 'आगे छोटा पीछे लंबा', 'Trail Length': 'ट्रेल लंबाई',
    '36 inches': '36 इंच', '40 inches': '40 इंच', '44 inches': '44 इंच',
    '48 inches': '48 इंच', '52 inches': '52 इंच', '56 inches': '56 इंच'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getOptionLabel = (category: string, option: string, language: Language): string => {
  if (language === 'en') return option;
  return DESIGN_OPTIONS_HI[category]?.[option] || option;
};
