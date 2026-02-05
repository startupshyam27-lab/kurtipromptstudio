// Color groups organized by main color with variations
export const COLOR_GROUPS = {
  pink: {
    label: 'Pink / गुलाबी',
    colors: ['Pastel Pink', 'Bright Pink', 'Rose Gold', 'Coral', 'Magenta', 'Blush Pink', 'Hot Pink', 'Salmon Pink', 'Dusty Pink', 'Fuchsia']
  },
  red: {
    label: 'Red / लाल',
    colors: ['Bright Red', 'Dark Maroon', 'Ruby Red', 'Dark Wine', 'Crimson', 'Burgundy', 'Scarlet', 'Vermillion', 'Rust Red', 'Cherry Red']
  },
  orange: {
    label: 'Orange / नारंगी',
    colors: ['Bright Orange', 'Pastel Peach', 'Tangerine', 'Burnt Orange', 'Rust', 'Apricot', 'Terracotta', 'Pumpkin', 'Copper Orange', 'Saffron']
  },
  yellow: {
    label: 'Yellow / पीला',
    colors: ['Pastel Yellow', 'Bright Yellow', 'Golden Yellow', 'Mustard', 'Lemon Yellow', 'Canary Yellow', 'Turmeric', 'Marigold', 'Honey Gold', 'Butter Yellow']
  },
  green: {
    label: 'Green / हरा',
    colors: ['Pastel Green', 'Bright Green', 'Dark Green', 'Emerald Green', 'Pastel Mint', 'Dark Teal', 'Olive Green', 'Sage Green', 'Forest Green', 'Bottle Green', 'Parrot Green', 'Sea Green', 'Lime Green', 'Jade Green']
  },
  blue: {
    label: 'Blue / नीला',
    colors: ['Pastel Blue', 'Bright Blue', 'Dark Navy', 'Royal Blue', 'Sapphire Blue', 'Turquoise', 'Sky Blue', 'Teal Blue', 'Cobalt Blue', 'Peacock Blue', 'Indigo', 'Persian Blue', 'Powder Blue', 'Aqua Blue']
  },
  purple: {
    label: 'Purple / बैंगनी',
    colors: ['Pastel Lavender', 'Bright Purple', 'Violet', 'Plum', 'Mauve', 'Orchid', 'Lilac', 'Grape Purple', 'Aubergine', 'Wine Purple', 'Royal Purple', 'Amethyst']
  },
  neutral: {
    label: 'Neutral / न्यूट्रल',
    colors: ['Black', 'Dark Grey', 'Silver Grey', 'Charcoal', 'Slate Grey', 'Ash Grey', 'Graphite', 'Gunmetal']
  },
  white: {
    label: 'White & Cream / सफेद',
    colors: ['Pure White', 'Off-White', 'Ivory', 'Cream', 'Beige', 'Pearl White', 'Champagne', 'Vanilla', 'Ecru', 'Bone White']
  },
  brown: {
    label: 'Brown / भूरा',
    colors: ['Dark Brown', 'Chocolate Brown', 'Coffee Brown', 'Caramel', 'Tan', 'Mocha', 'Chestnut', 'Walnut', 'Mahogany', 'Cocoa']
  },
  gold: {
    label: 'Gold & Metallic / सुनहरा',
    colors: ['Antique Gold', 'Bright Gold', 'Rose Gold', 'Champagne Gold', 'Bronze', 'Copper', 'Silver', 'Platinum', 'Metallic Pink', 'Metallic Blue']
  },
  multi: {
    label: 'Multi & Special / बहुरंगी',
    colors: ['Dual-tone', 'Multi-color', 'Ombre', 'Gradient', 'Tie-Dye Effect', 'Color Block', 'Rainbow', 'Contrast Combination']
  }
} as const;

// Flatten all colors for the main DESIGN_OPTIONS
export const ALL_COLORS = Object.values(COLOR_GROUPS).flatMap(group => group.colors);

export const COLOR_TRANSLATIONS_HI: Record<string, string> = {
  // Pink
  'Pastel Pink': 'पेस्टल गुलाबी', 'Bright Pink': 'चमकीला गुलाबी', 'Rose Gold': 'रोज़ गोल्ड',
  'Coral': 'कोरल', 'Magenta': 'मैजेंटा', 'Blush Pink': 'ब्लश पिंक', 'Hot Pink': 'हॉट पिंक',
  'Salmon Pink': 'सैल्मन पिंक', 'Dusty Pink': 'डस्टी पिंक', 'Fuchsia': 'फ्यूशिया',
  
  // Red
  'Bright Red': 'चमकीला लाल', 'Dark Maroon': 'गहरा मैरून', 'Ruby Red': 'माणिक लाल',
  'Dark Wine': 'गहरा वाइन', 'Crimson': 'क्रिमसन', 'Burgundy': 'बर्गंडी', 'Scarlet': 'स्कार्लेट',
  'Vermillion': 'सिंदूरी', 'Rust Red': 'जंग लाल', 'Cherry Red': 'चेरी लाल',
  
  // Orange
  'Bright Orange': 'चमकीला नारंगी', 'Pastel Peach': 'पेस्टल पीच', 'Tangerine': 'नारंगी',
  'Burnt Orange': 'बर्न्ट ऑरेंज', 'Rust': 'जंग रंग', 'Apricot': 'खुबानी', 'Terracotta': 'टेराकोटा',
  'Pumpkin': 'कद्दू रंग', 'Copper Orange': 'तांबा नारंगी', 'Saffron': 'केसरिया',
  
  // Yellow
  'Pastel Yellow': 'पेस्टल पीला', 'Bright Yellow': 'चमकीला पीला', 'Golden Yellow': 'सुनहरा पीला',
  'Mustard': 'सरसों', 'Lemon Yellow': 'नींबू पीला', 'Canary Yellow': 'कैनरी पीला',
  'Turmeric': 'हल्दी', 'Marigold': 'गेंदा', 'Honey Gold': 'शहद सुनहरा', 'Butter Yellow': 'मक्खन पीला',
  
  // Green
  'Pastel Green': 'पेस्टल हरा', 'Bright Green': 'चमकीला हरा', 'Dark Green': 'गहरा हरा',
  'Emerald Green': 'पन्ना हरा', 'Pastel Mint': 'पेस्टल मिंट', 'Dark Teal': 'गहरा टील',
  'Olive Green': 'जैतून हरा', 'Sage Green': 'सेज हरा', 'Forest Green': 'जंगली हरा',
  'Bottle Green': 'बोतल हरा', 'Parrot Green': 'तोता हरा', 'Sea Green': 'समुद्री हरा',
  'Lime Green': 'नीबू हरा', 'Jade Green': 'जेड हरा',
  
  // Blue
  'Pastel Blue': 'पेस्टल नीला', 'Bright Blue': 'चमकीला नीला', 'Dark Navy': 'गहरा नेवी',
  'Royal Blue': 'रॉयल नीला', 'Sapphire Blue': 'नीलम नीला', 'Turquoise': 'फ़िरोज़ा',
  'Sky Blue': 'आसमानी', 'Teal Blue': 'टील नीला', 'Cobalt Blue': 'कोबाल्ट नीला',
  'Peacock Blue': 'मोर नीला', 'Indigo': 'नील', 'Persian Blue': 'फ़ारसी नीला',
  'Powder Blue': 'पाउडर नीला', 'Aqua Blue': 'एक्वा नीला',
  
  // Purple
  'Pastel Lavender': 'पेस्टल लैवेंडर', 'Bright Purple': 'चमकीला बैंगनी', 'Violet': 'वायलेट',
  'Plum': 'बेर', 'Mauve': 'मॉव', 'Orchid': 'ऑर्किड', 'Lilac': 'बकाइन',
  'Grape Purple': 'अंगूर बैंगनी', 'Aubergine': 'बैंगन', 'Wine Purple': 'वाइन बैंगनी',
  'Royal Purple': 'रॉयल बैंगनी', 'Amethyst': 'जामुनी',
  
  // Neutral
  'Black': 'काला', 'Dark Grey': 'गहरा स्लेटी', 'Silver Grey': 'चांदी स्लेटी',
  'Charcoal': 'कोयला', 'Slate Grey': 'स्लेट स्लेटी', 'Ash Grey': 'राख स्लेटी',
  'Graphite': 'ग्रेफाइट', 'Gunmetal': 'गनमेटल',
  
  // White
  'Pure White': 'शुद्ध सफेद', 'Off-White': 'ऑफ-व्हाइट', 'Ivory': 'हाथीदांत',
  'Cream': 'क्रीम', 'Beige': 'बेज', 'Pearl White': 'मोती सफेद',
  'Champagne': 'शैम्पेन', 'Vanilla': 'वेनिला', 'Ecru': 'एक्रू', 'Bone White': 'हड्डी सफेद',
  
  // Brown
  'Dark Brown': 'गहरा भूरा', 'Chocolate Brown': 'चॉकलेट भूरा', 'Coffee Brown': 'कॉफी भूरा',
  'Caramel': 'कैरामेल', 'Tan': 'टैन', 'Mocha': 'मोका', 'Chestnut': 'चेस्टनट',
  'Walnut': 'अखरोट', 'Mahogany': 'महोगनी', 'Cocoa': 'कोको',
  
  // Gold
  'Antique Gold': 'एंटीक गोल्ड', 'Bright Gold': 'चमकीला सोना', 'Champagne Gold': 'शैम्पेन गोल्ड',
  'Bronze': 'कांसा', 'Copper': 'तांबा', 'Silver': 'चांदी', 'Platinum': 'प्लैटिनम',
  'Metallic Pink': 'मेटैलिक पिंक', 'Metallic Blue': 'मेटैलिक ब्लू',
  
  // Multi
  'Dual-tone': 'दो रंग', 'Multi-color': 'बहुरंगी', 'Ombre': 'ओम्ब्रे', 'Gradient': 'ग्रेडिएंट',
  'Tie-Dye Effect': 'टाई-डाई इफेक्ट', 'Color Block': 'कलर ब्लॉक', 'Rainbow': 'इंद्रधनुष',
  'Contrast Combination': 'कंट्रास्ट कॉम्बिनेशन'
};

// Color preview mapping for visual reference
export const COLOR_PREVIEWS: Record<string, string> = {
  // Pink shades
  'Pastel Pink': '#FFD1DC', 'Bright Pink': '#FF69B4', 'Rose Gold': '#B76E79', 'Coral': '#FF7F50',
  'Magenta': '#FF00FF', 'Blush Pink': '#DE5D83', 'Hot Pink': '#FF1493', 'Salmon Pink': '#FA8072',
  'Dusty Pink': '#D4A5A5', 'Fuchsia': '#FF00FF',
  
  // Red shades  
  'Bright Red': '#FF0000', 'Dark Maroon': '#800000', 'Ruby Red': '#9B111E', 'Dark Wine': '#722F37',
  'Crimson': '#DC143C', 'Burgundy': '#800020', 'Scarlet': '#FF2400', 'Vermillion': '#E34234',
  'Rust Red': '#A0522D', 'Cherry Red': '#DE3163',
  
  // Orange shades
  'Bright Orange': '#FF8C00', 'Pastel Peach': '#FFDAB9', 'Tangerine': '#FF9966', 'Burnt Orange': '#CC5500',
  'Rust': '#B7410E', 'Apricot': '#FBCEB1', 'Terracotta': '#E2725B', 'Pumpkin': '#FF7518',
  'Copper Orange': '#B87333', 'Saffron': '#F4C430',
  
  // Yellow shades
  'Pastel Yellow': '#FFFACD', 'Bright Yellow': '#FFFF00', 'Golden Yellow': '#FFD700', 'Mustard': '#FFDB58',
  'Lemon Yellow': '#FFF44F', 'Canary Yellow': '#FFEF00', 'Turmeric': '#E3A857', 'Marigold': '#EAA221',
  'Honey Gold': '#EB9605', 'Butter Yellow': '#FFFAA0',
  
  // Green shades
  'Pastel Green': '#98FB98', 'Bright Green': '#00FF00', 'Dark Green': '#006400', 'Emerald Green': '#50C878',
  'Pastel Mint': '#98FF98', 'Dark Teal': '#014D4E', 'Olive Green': '#808000', 'Sage Green': '#87AE73',
  'Forest Green': '#228B22', 'Bottle Green': '#006A4E', 'Parrot Green': '#78B14B', 'Sea Green': '#2E8B57',
  'Lime Green': '#32CD32', 'Jade Green': '#00A86B',
  
  // Blue shades
  'Pastel Blue': '#AEC6CF', 'Bright Blue': '#0000FF', 'Dark Navy': '#000080', 'Royal Blue': '#4169E1',
  'Sapphire Blue': '#0F52BA', 'Turquoise': '#40E0D0', 'Sky Blue': '#87CEEB', 'Teal Blue': '#367588',
  'Cobalt Blue': '#0047AB', 'Peacock Blue': '#005F69', 'Indigo': '#4B0082', 'Persian Blue': '#1C39BB',
  'Powder Blue': '#B0E0E6', 'Aqua Blue': '#00FFFF',
  
  // Purple shades
  'Pastel Lavender': '#E6E6FA', 'Bright Purple': '#9400D3', 'Violet': '#EE82EE', 'Plum': '#DDA0DD',
  'Mauve': '#E0B0FF', 'Orchid': '#DA70D6', 'Lilac': '#C8A2C8', 'Grape Purple': '#6F2DA8',
  'Aubergine': '#614051', 'Wine Purple': '#722F37', 'Royal Purple': '#7851A9', 'Amethyst': '#9966CC',
  
  // Neutral shades
  'Black': '#000000', 'Dark Grey': '#A9A9A9', 'Silver Grey': '#C0C0C0', 'Charcoal': '#36454F',
  'Slate Grey': '#708090', 'Ash Grey': '#B2BEB5', 'Graphite': '#383838', 'Gunmetal': '#2C3539',
  
  // White shades
  'Pure White': '#FFFFFF', 'Off-White': '#FAF9F6', 'Ivory': '#FFFFF0', 'Cream': '#FFFDD0',
  'Beige': '#F5F5DC', 'Pearl White': '#F0EAD6', 'Champagne': '#F7E7CE', 'Vanilla': '#F3E5AB',
  'Ecru': '#C2B280', 'Bone White': '#F9F6EE',
  
  // Brown shades
  'Dark Brown': '#654321', 'Chocolate Brown': '#7B3F00', 'Coffee Brown': '#6F4E37', 'Caramel': '#FFD59A',
  'Tan': '#D2B48C', 'Mocha': '#967969', 'Chestnut': '#954535', 'Walnut': '#773F1A',
  'Mahogany': '#C04000', 'Cocoa': '#D2691E',
  
  // Gold shades
  'Antique Gold': '#CFB53B', 'Bright Gold': '#FFD700', 'Champagne Gold': '#F1DDCF', 'Bronze': '#CD7F32',
  'Copper': '#B87333', 'Silver': '#C0C0C0', 'Platinum': '#E5E4E2', 'Metallic Pink': '#EDA6C4',
  'Metallic Blue': '#32527B',
  
  // Multi/Special
  'Dual-tone': 'linear-gradient(90deg, #FF69B4, #87CEEB)',
  'Multi-color': 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #9400D3)',
  'Ombre': 'linear-gradient(180deg, #FFB6C1, #FF69B4)',
  'Gradient': 'linear-gradient(135deg, #667eea, #764ba2)',
  'Tie-Dye Effect': 'conic-gradient(#FF69B4, #87CEEB, #98FB98, #FFD700, #FF69B4)',
  'Color Block': 'linear-gradient(90deg, #FF6B6B 33%, #4ECDC4 33%, #4ECDC4 66%, #45B7D1 66%)',
  'Rainbow': 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
  'Contrast Combination': 'linear-gradient(90deg, #000000, #FFFFFF)'
};
