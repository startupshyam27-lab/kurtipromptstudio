// Grouped design options with Hindi translations

// ============ FABRIC GROUPS ============
export const FABRIC_GROUPS = {
  cotton: {
    label: 'Cotton',
    labelHi: 'कॉटन',
    options: ['Pure Cotton', 'Handloom Cotton', 'Slub Cotton', 'Cotton Silk', 'Cotton Linen', 'Khadi Cotton', 'Organic Cotton', 'Jacquard Cotton']
  },
  silk: {
    label: 'Silk',
    labelHi: 'सिल्क',
    options: ['Pure Silk', 'Art Silk', 'Raw Silk', 'Tussar Silk', 'Banarasi Silk', 'Kanjivaram Silk', 'Patola Silk', 'Mysore Silk', 'Chanderi Silk']
  },
  rayon: {
    label: 'Rayon',
    labelHi: 'रेयॉन',
    options: ['Rayon', 'Modal Rayon', 'Viscose Rayon', 'Rayon Crepe']
  },
  linen: {
    label: 'Linen',
    labelHi: 'लिनन',
    options: ['Pure Linen', 'Linen Blend', 'Handloom Linen']
  },
  georgette: {
    label: 'Georgette',
    labelHi: 'जॉर्जेट',
    options: ['Georgette', 'Faux Georgette', 'Heavy Georgette', 'Chiffon Georgette']
  },
  crepe: {
    label: 'Crepe',
    labelHi: 'क्रेप',
    options: ['Crepe', 'Moss Crepe', 'Satin Crepe', 'French Crepe']
  },
  other: {
    label: 'Other Fabrics',
    labelHi: 'अन्य कपड़े',
    options: ['Chanderi', 'Maheshwari', 'Kota Doria', 'Organza', 'Net', 'Velvet', 'Brocade', 'Jacquard', 'Satin', 'Lycra Blend', 'Muslin', 'Cambric']
  }
} as const;

// ============ EMBROIDERY GROUPS ============
export const EMBROIDERY_GROUPS = {
  traditional: {
    label: 'Traditional',
    labelHi: 'पारंपरिक',
    options: ['Chikankari', 'Lucknowi Chikan', 'Phulkari', 'Kantha', 'Kashida', 'Aari', 'Zardozi', 'Gota Patti', 'Dabka']
  },
  threadWork: {
    label: 'Thread Work',
    labelHi: 'धागे का काम',
    options: ['Thread Work', 'Resham Work', 'French Knot', 'Cross Stitch', 'Chain Stitch', 'Satin Stitch', 'Shadow Work']
  },
  metalWork: {
    label: 'Metal Work',
    labelHi: 'धातु का काम',
    options: ['Zari Work', 'Gold Zari', 'Silver Zari', 'Copper Zari', 'Antique Zari']
  },
  embellished: {
    label: 'Embellished',
    labelHi: 'सजावटी',
    options: ['Mirror Work', 'Sequin Work', 'Bead Work', 'Pearl Work', 'Stone Work', 'Kundan Work', 'Crystal Work']
  },
  modern: {
    label: 'Modern',
    labelHi: 'आधुनिक',
    options: ['Cutwork', 'Applique', 'Patchwork', 'Ribbon Work', 'Laser Cut', '3D Embroidery']
  },
  none: {
    label: 'None',
    labelHi: 'कोई नहीं',
    options: ['None']
  }
} as const;

// ============ PRINT TECHNIQUE GROUPS ============
export const PRINT_GROUPS = {
  blockPrint: {
    label: 'Block Print',
    labelHi: 'ब्लॉक प्रिंट',
    options: ['Block Print', 'Hand Block Print', 'Dabu Print', 'Bagru Print', 'Ajrakh Print', 'Sanganeri Print']
  },
  artPrint: {
    label: 'Art & Craft Print',
    labelHi: 'कला प्रिंट',
    options: ['Kalamkari', 'Pen Kalamkari', 'Block Kalamkari', 'Madhubani Print', 'Warli Print', 'Pichwai Print']
  },
  resistPrint: {
    label: 'Resist Print',
    labelHi: 'रेज़िस्ट प्रिंट',
    options: ['Tie-Dye', 'Bandhani', 'Leheriya', 'Shibori', 'Batik']
  },
  modernPrint: {
    label: 'Modern Print',
    labelHi: 'आधुनिक प्रिंट',
    options: ['Digital Print', 'Screen Print', 'Discharge Print', 'Foil Print', 'Flock Print', 'Sublimation Print']
  },
  patternPrint: {
    label: 'Pattern Print',
    labelHi: 'पैटर्न प्रिंट',
    options: ['Ikat', 'Patola', 'Geometric Print', 'Abstract Print', 'Floral Print', 'Paisley Print', 'Animal Print', 'Tribal Print']
  }
} as const;

// ============ SILHOUETTE GROUPS ============
export const SILHOUETTE_GROUPS = {
  classic: {
    label: 'Classic Cuts',
    labelHi: 'क्लासिक कट',
    options: ['Straight Cut', 'A-Line', 'Fitted', 'Semi-Fitted', 'Relaxed Fit', 'Loose Fit', 'Flared']
  },
  traditional: {
    label: 'Traditional',
    labelHi: 'पारंपरिक',
    options: ['Anarkali', 'Angrakha', 'Princess Cut', 'Empire Line', 'Peplum', 'Mermaid', 'Umbrella Cut']
  },
  modern: {
    label: 'Modern Style',
    labelHi: 'आधुनिक स्टाइल',
    options: ['Kaftan Style', 'Shirt Style', 'Tunic Style', 'Jacket Style', 'Overlap Style', 'Wrap Style', 'Layered']
  },
  special: {
    label: 'Special Cuts',
    labelHi: 'विशेष कट',
    options: ['Asymmetric', 'Side Slit', 'Front Slit', 'Trail Cut', 'Paneled', 'Tiered']
  }
} as const;

// ============ NECKLINE GROUPS ============
export const NECKLINE_GROUPS = {
  round: {
    label: 'Round & U-Neck',
    labelHi: 'गोल गला',
    options: ['Round Neck', 'Deep Round', 'Shallow Round', 'U-Neck', 'Scoop Neck']
  },
  vNeck: {
    label: 'V-Neck',
    labelHi: 'वी-नेक',
    options: ['V-Neck', 'Deep V-Neck', 'Sweetheart', 'Notched V']
  },
  square: {
    label: 'Square & Boat',
    labelHi: 'स्क्वायर नेक',
    options: ['Square Neck', 'Wide Square', 'Boat Neck', 'Bateau Neck']
  },
  collar: {
    label: 'Collar Types',
    labelHi: 'कॉलर',
    options: ['Mandarin Collar', 'Chinese Collar', 'Band Collar', 'Peter Pan Collar', 'Nehru Collar', 'Shirt Collar', 'Stand Collar']
  },
  special: {
    label: 'Special',
    labelHi: 'विशेष',
    options: ['Keyhole', 'Teardrop', 'Halter', 'High Neck', 'Turtle Neck', 'Cowl Neck']
  },
  decorated: {
    label: 'Decorated',
    labelHi: 'सजा हुआ',
    options: ['Embroidered Neckline', 'Piping Neck', 'Lace Trim Neck', 'Tassel Neck', 'Button Placket', 'Zari Border Neck']
  }
} as const;

// ============ SLEEVES GROUPS ============
export const SLEEVES_GROUPS = {
  length: {
    label: 'By Length',
    labelHi: 'लंबाई के अनुसार',
    options: ['Sleeveless', 'Cap Sleeves', 'Short Sleeves', 'Elbow Length', '3/4 Sleeves', 'Full Sleeves', 'Extra Long']
  },
  shaped: {
    label: 'Shaped Sleeves',
    labelHi: 'आकार वाली',
    options: ['Bell Sleeves', 'Flutter Sleeves', 'Puff Sleeves', 'Balloon Sleeves', 'Lantern Sleeves', 'Bishop Sleeves', 'Trumpet Sleeves']
  },
  fitted: {
    label: 'Fitted',
    labelHi: 'फिटेड',
    options: ['Fitted Sleeves', 'Slim Sleeves', 'Straight Sleeves']
  },
  special: {
    label: 'Special Style',
    labelHi: 'विशेष स्टाइल',
    options: ['Cold Shoulder', 'Off Shoulder', 'One Shoulder', 'Raglan Sleeves', 'Kimono Sleeves', 'Dolman Sleeves', 'Cape Sleeves']
  },
  decorated: {
    label: 'Decorated',
    labelHi: 'सजी हुई',
    options: ['Slit Sleeves', 'Layered Sleeves', 'Tiered Sleeves', 'Ruffled Sleeves', 'Embroidered Cuff', 'Lace Sleeves']
  }
} as const;

// ============ ADDITIONAL HINDI TRANSLATIONS ============
export const ADDITIONAL_TRANSLATIONS_HI: Record<string, Record<string, string>> = {
  printTechnique: {
    'Block Print': 'ब्लॉक प्रिंट', 'Hand Block Print': 'हैंड ब्लॉक प्रिंट', 'Dabu Print': 'दाबू प्रिंट',
    'Bagru Print': 'बागरू प्रिंट', 'Ajrakh Print': 'अजरख प्रिंट', 'Sanganeri Print': 'सांगानेरी प्रिंट',
    'Kalamkari': 'कलमकारी', 'Pen Kalamkari': 'पेन कलमकारी', 'Block Kalamkari': 'ब्लॉक कलमकारी',
    'Madhubani Print': 'मधुबनी प्रिंट', 'Warli Print': 'वारली प्रिंट', 'Pichwai Print': 'पिछवाई प्रिंट',
    'Tie-Dye': 'टाई-डाई', 'Bandhani': 'बंधनी', 'Leheriya': 'लहरिया', 'Shibori': 'शिबोरी', 'Batik': 'बाटिक',
    'Digital Print': 'डिजिटल प्रिंट', 'Screen Print': 'स्क्रीन प्रिंट', 'Discharge Print': 'डिस्चार्ज प्रिंट',
    'Foil Print': 'फॉयल प्रिंट', 'Flock Print': 'फ्लॉक प्रिंट', 'Sublimation Print': 'सब्लिमेशन प्रिंट',
    'Ikat': 'इकत', 'Patola': 'पटोला', 'Geometric Print': 'ज्यामितीय प्रिंट', 'Abstract Print': 'एब्स्ट्रैक्ट प्रिंट',
    'Floral Print': 'फ्लोरल प्रिंट', 'Paisley Print': 'पैस्ले प्रिंट', 'Animal Print': 'एनिमल प्रिंट', 'Tribal Print': 'ट्राइबल प्रिंट'
  },
  motifPattern: {
    'Floral Motif': 'फूल मोटिफ', 'Paisley Motif': 'पैस्ले मोटिफ', 'Geometric Motif': 'ज्यामितीय मोटिफ',
    'Abstract Motif': 'एब्स्ट्रैक्ट मोटिफ', 'Ethnic Motif': 'एथनिक मोटिफ', 'Peacock Motif': 'मोर मोटिफ',
    'Elephant Motif': 'हाथी मोटिफ', 'Lotus Motif': 'कमल मोटिफ', 'Mango Motif': 'आम मोटिफ',
    'Temple Motif': 'मंदिर मोटिफ', 'Mughal Motif': 'मुगल मोटिफ', 'Rajasthani Motif': 'राजस्थानी मोटिफ',
    'South Indian Motif': 'दक्षिण भारतीय मोटिफ', 'Tribal Motif': 'आदिवासी मोटिफ', 'Minimalist Motif': 'मिनिमलिस्ट मोटिफ'
  },
  borderStyle: {
    'No Border': 'बिना बॉर्डर', 'Plain Border': 'सादा बॉर्डर', 'Contrast Border': 'कंट्रास्ट बॉर्डर',
    'Matching Border': 'मैचिंग बॉर्डर', 'Embroidered Border': 'कढ़ाई वाला बॉर्डर', 'Zari Border': 'ज़री बॉर्डर',
    'Gota Border': 'गोटा बॉर्डर', 'Lace Border': 'लेस बॉर्डर', 'Crochet Border': 'क्रोशिया बॉर्डर',
    'Printed Border': 'प्रिंटेड बॉर्डर', 'Block Print Border': 'ब्लॉक प्रिंट बॉर्डर', 'Digital Print Border': 'डिजिटल प्रिंट बॉर्डर',
    'Scalloped Border': 'स्कैलप्ड बॉर्डर', 'Geometric Border': 'ज्यामितीय बॉर्डर', 'Floral Border': 'फ्लोरल बॉर्डर',
    'Paisley Border': 'पैस्ले बॉर्डर', 'Beaded Border': 'मोती वाला बॉर्डर', 'Sequin Border': 'सीक्विन बॉर्डर',
    'Mirror Border': 'शीशे का बॉर्डर', 'Tassel Border': 'टैसल बॉर्डर', 'Fringe Border': 'फ्रिंज बॉर्डर'
  },
  embellishments: {
    'Tassels': 'टैसल', 'Pom Poms': 'पोम पोम', 'Fabric Buttons': 'फैब्रिक बटन', 'Metal Buttons': 'मेटल बटन',
    'Pearl Buttons': 'मोती के बटन', 'Designer Buttons': 'डिज़ाइनर बटन', 'Latkans': 'लटकन', 'Hangings': 'हैंगिंग',
    'Fabric Flowers': 'फैब्रिक फूल', '3D Flowers': '3D फूल', 'Brooch': 'ब्रोच', 'Buckle': 'बकल',
    'Metal Studs': 'मेटल स्टड', 'Crystal Studs': 'क्रिस्टल स्टड', 'Piping': 'पाइपिंग', 'Bias Tape': 'बायस टेप',
    'Cord Detailing': 'कॉर्ड डिटेलिंग', 'Fabric Loops': 'फैब्रिक लूप', 'Sequin Patches': 'सीक्विन पैच',
    'Embroidered Patches': 'कढ़ाई वाले पैच', 'Applique Motifs': 'एप्लिक मोटिफ'
  },
  hemlineStyle: {
    'Straight Hemline': 'सीधी हेमलाइन', 'Curved Hemline': 'घुमावदार हेमलाइन', 'Asymmetric Hemline': 'असमैट्रिक हेमलाइन',
    'High-Low Hemline': 'हाई-लो हेमलाइन', 'Scalloped Hemline': 'स्कैलप्ड हेमलाइन', 'Pointed Hemline': 'नुकीली हेमलाइन',
    'Rounded Hemline': 'गोल हेमलाइन', 'Handkerchief Hemline': 'हैंडकरचीफ हेमलाइन', 'Fishtail Hemline': 'फिशटेल हेमलाइन',
    'Layered Hemline': 'लेयर्ड हेमलाइन', 'Ruffled Hemline': 'रफल्ड हेमलाइन', 'Fringed Hemline': 'फ्रिंज्ड हेमलाइन'
  },
  slitStyle: {
    'No Slit': 'बिना स्लिट', 'Side Slit Small': 'छोटा साइड स्लिट', 'Side Slit Medium': 'मध्यम साइड स्लिट',
    'Side Slit Deep': 'गहरा साइड स्लिट', 'Side Slit Both Sides': 'दोनों तरफ स्लिट', 'Front Slit': 'फ्रंट स्लिट',
    'Back Slit': 'बैक स्लिट', 'Front Center Slit': 'फ्रंट सेंटर स्लिट', 'Curved Slit': 'घुमावदार स्लिट',
    'Straight Slit': 'सीधा स्लिट', 'Asymmetric Slit': 'असमैट्रिक स्लिट', 'Layered Slit': 'लेयर्ड स्लिट'
  },
  collarStyle: {
    'No Collar': 'बिना कॉलर', 'Stand Collar': 'स्टैंड कॉलर', 'Flat Collar': 'फ्लैट कॉलर',
    'Rolled Collar': 'रोल्ड कॉलर', 'Shawl Collar': 'शॉल कॉलर', 'Notched Collar': 'नॉच्ड कॉलर',
    'Pointed Collar': 'पॉइंटेड कॉलर', 'Rounded Collar': 'गोल कॉलर', 'Mandarin Collar': 'मंदारिन कॉलर',
    'Ruffle Collar': 'रफल कॉलर'
  },
  placketStyle: {
    'No Placket': 'बिना प्लैकेट', 'Center Placket': 'सेंटर प्लैकेट', 'Side Placket': 'साइड प्लैकेट',
    'Hidden Placket': 'हिडन प्लैकेट', 'Contrast Placket': 'कंट्रास्ट प्लैकेट', 'Embroidered Placket': 'कढ़ाई वाला प्लैकेट',
    'Button Placket': 'बटन प्लैकेट', 'Loop Placket': 'लूप प्लैकेट', 'Zipper Placket': 'ज़िपर प्लैकेट',
    'Tie-Up Placket': 'टाई-अप प्लैकेट'
  },
  cuffStyle: {
    'No Cuff': 'बिना कफ', 'Plain Cuff': 'सादा कफ', 'Contrast Cuff': 'कंट्रास्ट कफ',
    'Embroidered Cuff': 'कढ़ाई वाला कफ', 'Buttoned Cuff': 'बटन वाला कफ', 'Elastic Cuff': 'इलास्टिक कफ',
    'Ruffle Cuff': 'रफल कफ', 'Lace Cuff': 'लेस कफ', 'Roll-Up Cuff': 'रोल-अप कफ', 'Slit Cuff': 'स्लिट कफ'
  },
  yokeStyle: {
    'No Yoke': 'बिना योक', 'Round Yoke': 'गोल योक', 'Square Yoke': 'स्क्वायर योक', 'V-Yoke': 'वी-योक',
    'Curved Yoke': 'घुमावदार योक', 'Embroidered Yoke': 'कढ़ाई वाला योक', 'Printed Yoke': 'प्रिंटेड योक',
    'Contrast Yoke': 'कंट्रास्ट योक', 'Pleated Yoke': 'प्लीटेड योक', 'Smocked Yoke': 'स्मॉक्ड योक',
    'Gathered Yoke': 'गैदर्ड योक', 'Pintuck Yoke': 'पिंटक योक'
  },
  panelDesign: {
    'No Panels': 'बिना पैनल', 'Side Panels': 'साइड पैनल', 'Front Panels': 'फ्रंट पैनल',
    'Princess Panels': 'प्रिंसेस पैनल', 'Godet Panels': 'गोडेट पैनल', 'Contrast Panels': 'कंट्रास्ट पैनल',
    'Embroidered Panels': 'कढ़ाई वाले पैनल', 'Printed Panels': 'प्रिंटेड पैनल',
    'Pleated Panels': 'प्लीटेड पैनल', 'Layered Panels': 'लेयर्ड पैनल'
  },
  backDesign: {
    'Plain Back': 'सादी पीठ', 'Deep Back': 'गहरी पीठ', 'Medium Deep Back': 'मध्यम गहरी पीठ',
    'Shallow Back': 'छोटी पीठ', 'Boat Back': 'बोट बैक', 'Keyhole Back': 'कीहोल बैक',
    'V-Back': 'वी-बैक', 'Round Back': 'गोल बैक', 'Square Back': 'स्क्वायर बैक',
    'Embroidered Back': 'कढ़ाई वाली पीठ', 'Printed Back': 'प्रिंटेड पीठ', 'Lace Back': 'लेस बैक',
    'Sheer Back': 'शीयर बैक', 'Tie-Up Back': 'टाई-अप बैक', 'Button Back': 'बटन बैक', 'Zipper Back': 'ज़िपर बैक'
  },
  pocketStyle: {
    'No Pockets': 'बिना पॉकेट', 'Side Seam Pockets': 'साइड सीम पॉकेट', 'Patch Pockets': 'पैच पॉकेट',
    'Welt Pockets': 'वेल्ट पॉकेट', 'Hidden Pockets': 'हिडन पॉकेट', 'Kangaroo Pocket': 'कंगारू पॉकेट',
    'Decorative Pockets': 'सजावटी पॉकेट', 'Embroidered Pockets': 'कढ़ाई वाले पॉकेट',
    'Contrast Pockets': 'कंट्रास्ट पॉकेट', 'Button Pockets': 'बटन पॉकेट'
  },
  closureType: {
    'Pullover (No Closure)': 'पुलओवर (बिना क्लोज़र)', 'Front Button': 'फ्रंट बटन', 'Back Button': 'बैक बटन',
    'Side Button': 'साइड बटन', 'Front Zipper': 'फ्रंट ज़िपर', 'Back Zipper': 'बैक ज़िपर',
    'Side Zipper': 'साइड ज़िपर', 'Tie-Up': 'टाई-अप', 'Hook and Eye': 'हुक और आई', 'Snap Buttons': 'स्नैप बटन'
  },
  liningType: {
    'Unlined': 'बिना अस्तर', 'Fully Lined': 'पूरा अस्तर', 'Half Lined': 'आधा अस्तर', 'Bodice Lined': 'बोडिस अस्तर',
    'Cotton Lining': 'कॉटन अस्तर', 'Silk Lining': 'सिल्क अस्तर', 'Santoon Lining': 'सैंटून अस्तर', 'Crepe Lining': 'क्रेप अस्तर'
  },
  finishingDetails: {
    'Clean Finished': 'क्लीन फिनिश', 'Piping Finish': 'पाइपिंग फिनिश', 'Bias Finish': 'बायस फिनिश',
    'Serged Finish': 'सर्ज्ड फिनिश', 'French Seam': 'फ्रेंच सीम', 'Flat Felled Seam': 'फ्लैट फेल्ड सीम',
    'Overlocked': 'ओवरलॉक्ड', 'Contrast Stitching': 'कंट्रास्ट स्टिचिंग', 'Topstitching': 'टॉपस्टिचिंग',
    'Hand Finished': 'हैंड फिनिश्ड', 'Rolled Hem': 'रोल्ड हेम', 'Blind Hem': 'ब्लाइंड हेम'
  },
  colorCombination: {
    'Monochrome': 'मोनोक्रोम', 'Complementary Colors': 'पूरक रंग', 'Analogous Colors': 'समान रंग',
    'Triadic Colors': 'त्रिकोणीय रंग', 'Contrasting Colors': 'विपरीत रंग', 'Pastel Combination': 'पेस्टल संयोजन',
    'Jewel Tones': 'ज्वेल टोन', 'Earth Tones': 'अर्थ टोन', 'Neutral Palette': 'न्यूट्रल पैलेट',
    'Bold and Bright': 'बोल्ड और ब्राइट', 'Muted Tones': 'म्यूटेड टोन', 'Metallic Accents': 'मेटैलिक एक्सेंट'
  },
  seasonalStyle: {
    'Summer Collection': 'समर कलेक्शन', 'Winter Collection': 'विंटर कलेक्शन', 'Monsoon Special': 'मॉनसून स्पेशल',
    'Spring Collection': 'स्प्रिंग कलेक्शन', 'All Season': 'सभी मौसम', 'Transitional Wear': 'ट्रांज़िशनल वियर',
    'Lightweight Summer': 'हल्की गर्मी', 'Cozy Winter': 'आरामदायक सर्दी'
  },
  bodyType: {
    'All Body Types': 'सभी शरीर के प्रकार', 'Petite Friendly': 'पेटाइट फ्रेंडली', 'Plus Size Friendly': 'प्लस साइज़ फ्रेंडली',
    'Tall Friendly': 'लंबे कद के लिए', 'Hourglass': 'ऑवरग्लास', 'Pear Shape': 'नाशपाती शेप',
    'Apple Shape': 'सेब शेप', 'Rectangle Shape': 'आयत शेप'
  },
  ageGroup: {
    'All Ages': 'सभी उम्र', 'Young Adults (18-25)': 'युवा (18-25)', 'Adults (26-40)': 'वयस्क (26-40)',
    'Mature (40+)': 'परिपक्व (40+)', 'Teen Friendly': 'किशोर के लिए', 'Elegant Mature': 'एलिगेंट मैच्योर'
  },
  modelSkinTone: {
    'Fair': 'गोरा', 'Light': 'हल्का', 'Light-Medium': 'हल्का-मध्यम', 'Medium': 'मध्यम',
    'Medium-Tan': 'मध्यम-टैन', 'Tan': 'सांवला', 'Olive': 'जैतून', 'Brown': 'भूरा',
    'Dark Brown': 'गहरा भूरा', 'Deep': 'गहरा', 'Ebony': 'आबनूस',
    'Warm Undertone': 'गर्म अंडरटोन', 'Cool Undertone': 'ठंडा अंडरटोन', 'Neutral Undertone': 'न्यूट्रल अंडरटोन',
    'Dusky': 'सांवला', 'Wheatish': 'गेहुंआ', 'Golden': 'सुनहरा'
  },
  modelHeight: {
    'Petite (5\'0" - 5\'3")': 'छोटा कद (5\'0" - 5\'3")', 'Short (5\'3" - 5\'5")': 'छोटा (5\'3" - 5\'5")',
    'Average (5\'5" - 5\'7")': 'औसत (5\'5" - 5\'7")', 'Tall (5\'7" - 5\'9")': 'लंबा (5\'7" - 5\'9")',
    'Very Tall (5\'9"+)': 'बहुत लंबा (5\'9"+)'
  },
  modelPose: {
    'Standing Front': 'सामने खड़ा', 'Standing 3/4 View': '3/4 व्यू', 'Standing Side Profile': 'साइड प्रोफाइल',
    'Walking Pose': 'चलती मुद्रा', 'Graceful Pose': 'सुंदर मुद्रा', 'Traditional Pose': 'पारंपरिक मुद्रा',
    'Hands on Waist': 'कमर पर हाथ', 'Casual Relaxed': 'आरामदायक', 'Elegant Stance': 'शानदार मुद्रा'
  }
};

// Type exports
export type FabricGroupKey = keyof typeof FABRIC_GROUPS;
export type EmbroideryGroupKey = keyof typeof EMBROIDERY_GROUPS;
export type PrintGroupKey = keyof typeof PRINT_GROUPS;
export type SilhouetteGroupKey = keyof typeof SILHOUETTE_GROUPS;
export type NecklineGroupKey = keyof typeof NECKLINE_GROUPS;
export type SleevesGroupKey = keyof typeof SLEEVES_GROUPS;
