// ============= KURTI DESIGN MOTIFS - 600+ Authentic Designs with Visual Thumbnails =============
// Comprehensive design motifs organized by kurti-appropriate categories

export interface DesignMotif {
  id: string;
  name: string;
  nameHi: string;
  thumbnail: string; // Visual pattern indicator (textile-like symbols)
}

export interface DesignMotifGroup {
  label: string;
  labelHi: string;
  icon: string;
  motifs: DesignMotif[];
}

// ============ TRADITIONAL BORDERS (पारंपरिक बॉर्डर) - 50+ ============
export const TRADITIONAL_BORDER_MOTIFS: DesignMotif[] = [
  { id: 'border-zari', name: 'Zari Border', nameHi: 'ज़री बॉर्डर', thumbnail: '═══' },
  { id: 'border-gota-patti', name: 'Gota Patti Border', nameHi: 'गोटा पट्टी बॉर्डर', thumbnail: '▰▰▰' },
  { id: 'border-temple', name: 'Temple Border', nameHi: 'मंदिर बॉर्डर', thumbnail: '▲▲▲' },
  { id: 'border-wave', name: 'Wave Border', nameHi: 'लहर बॉर्डर', thumbnail: '∿∿∿' },
  { id: 'border-scallop', name: 'Scallop Border', nameHi: 'स्कैलप बॉर्डर', thumbnail: '⌒⌒⌒' },
  { id: 'border-paisley', name: 'Paisley Border', nameHi: 'बूटा बॉर्डर', thumbnail: '❧❧❧' },
  { id: 'border-floral-vine', name: 'Floral Vine Border', nameHi: 'फूल बेल बॉर्डर', thumbnail: '❀~❀' },
  { id: 'border-leaf', name: 'Leaf Border', nameHi: 'पत्ती बॉर्डर', thumbnail: '♠♠♠' },
  { id: 'border-diamond', name: 'Diamond Border', nameHi: 'हीरा बॉर्डर', thumbnail: '◆◆◆' },
  { id: 'border-geometric', name: 'Geometric Border', nameHi: 'ज्यामितीय बॉर्डर', thumbnail: '▢▢▢' },
  { id: 'border-piping', name: 'Piping Border', nameHi: 'पाइपिंग बॉर्डर', thumbnail: '───' },
  { id: 'border-lace', name: 'Lace Border', nameHi: 'लेस बॉर्डर', thumbnail: '❋❋❋' },
  { id: 'border-crochet', name: 'Crochet Border', nameHi: 'क्रोशिया बॉर्डर', thumbnail: '✿✿✿' },
  { id: 'border-tassel', name: 'Tassel Border', nameHi: 'टैसल बॉर्डर', thumbnail: '⌇⌇⌇' },
  { id: 'border-pompom', name: 'Pom Pom Border', nameHi: 'पोम पोम बॉर्डर', thumbnail: '●●●' },
  { id: 'border-mirror', name: 'Mirror Work Border', nameHi: 'शीशा बॉर्डर', thumbnail: '◎◎◎' },
  { id: 'border-sequin', name: 'Sequin Border', nameHi: 'सीक्विन बॉर्डर', thumbnail: '✦✦✦' },
  { id: 'border-beaded', name: 'Beaded Border', nameHi: 'मोती बॉर्डर', thumbnail: '○○○' },
  { id: 'border-kundan', name: 'Kundan Border', nameHi: 'कुंदन बॉर्डर', thumbnail: '◈◈◈' },
  { id: 'border-thread', name: 'Thread Work Border', nameHi: 'धागा बॉर्डर', thumbnail: '≈≈≈' },
  { id: 'border-resham', name: 'Resham Border', nameHi: 'रेशम बॉर्डर', thumbnail: '∞∞∞' },
  { id: 'border-velvet', name: 'Velvet Border', nameHi: 'वेलवेट बॉर्डर', thumbnail: '▓▓▓' },
  { id: 'border-brocade', name: 'Brocade Border', nameHi: 'ब्रोकेड बॉर्डर', thumbnail: '❖❖❖' },
  { id: 'border-chanderi', name: 'Chanderi Border', nameHi: 'चंदेरी बॉर्डर', thumbnail: '⋮⋮⋮' },
  { id: 'border-banarasi', name: 'Banarasi Border', nameHi: 'बनारसी बॉर्डर', thumbnail: '۞۞۞' },
  { id: 'border-kanjivaram', name: 'Kanjivaram Border', nameHi: 'कांजीवरम बॉर्डर', thumbnail: '▣▣▣' },
  { id: 'border-patola', name: 'Patola Border', nameHi: 'पटोला बॉर्डर', thumbnail: '╬╬╬' },
  { id: 'border-bandhani', name: 'Bandhani Border', nameHi: 'बंधानी बॉर्डर', thumbnail: '•••' },
  { id: 'border-kutchi', name: 'Kutchi Border', nameHi: 'कच्छी बॉर्डर', thumbnail: '✧✧✧' },
  { id: 'border-phulkari', name: 'Phulkari Border', nameHi: 'फुलकारी बॉर्डर', thumbnail: '❁❁❁' },
  { id: 'border-chikankari', name: 'Chikankari Border', nameHi: 'चिकनकारी बॉर्डर', thumbnail: '✾✾✾' },
  { id: 'border-lucknowi', name: 'Lucknowi Border', nameHi: 'लखनवी बॉर्डर', thumbnail: '❂❂❂' },
  { id: 'border-dabka', name: 'Dabka Border', nameHi: 'डबका बॉर्डर', thumbnail: '⊛⊛⊛' },
  { id: 'border-aari', name: 'Aari Border', nameHi: 'आरी बॉर्डर', thumbnail: '✺✺✺' },
  { id: 'border-zardozi', name: 'Zardozi Border', nameHi: 'ज़रदोज़ी बॉर्डर', thumbnail: '✵✵✵' },
  { id: 'border-applique', name: 'Applique Border', nameHi: 'अप्लीक बॉर्डर', thumbnail: '◐◐◐' },
  { id: 'border-patchwork', name: 'Patchwork Border', nameHi: 'पैचवर्क बॉर्डर', thumbnail: '▧▧▧' },
  { id: 'border-contrast', name: 'Contrast Border', nameHi: 'कंट्रास्ट बॉर्डर', thumbnail: '▮▮▮' },
  { id: 'border-double', name: 'Double Border', nameHi: 'डबल बॉर्डर', thumbnail: '║║║' },
  { id: 'border-triple', name: 'Triple Border', nameHi: 'ट्रिपल बॉर्डर', thumbnail: '≡≡≡' },
  { id: 'border-broad', name: 'Broad Border', nameHi: 'चौड़ा बॉर्डर', thumbnail: '▬▬▬' },
  { id: 'border-thin', name: 'Thin Border', nameHi: 'पतला बॉर्डर', thumbnail: '—-—' },
  { id: 'border-printed', name: 'Printed Border', nameHi: 'प्रिंटेड बॉर्डर', thumbnail: '▤▤▤' },
  { id: 'border-embossed', name: 'Embossed Border', nameHi: 'उभरा बॉर्डर', thumbnail: '▦▦▦' },
  { id: 'border-coin', name: 'Coin Border', nameHi: 'सिक्का बॉर्डर', thumbnail: '⊕⊕⊕' },
  { id: 'border-bell', name: 'Bell Border', nameHi: 'घंटी बॉर्डर', thumbnail: '⏣⏣⏣' },
  { id: 'border-tribal', name: 'Tribal Border', nameHi: 'आदिवासी बॉर्डर', thumbnail: '◭◭◭' },
  { id: 'border-modern', name: 'Modern Border', nameHi: 'आधुनिक बॉर्डर', thumbnail: '▪▪▪' },
  { id: 'border-minimal', name: 'Minimal Border', nameHi: 'मिनिमल बॉर्डर', thumbnail: '···' },
];

// ============ WEDDING & BRIDAL DESIGNS (शादी डिज़ाइन) - 55+ ============
export const WEDDING_MOTIFS: DesignMotif[] = [
  { id: 'wedding-heavy-zardozi', name: 'Heavy Zardozi Work', nameHi: 'भारी ज़रदोज़ी', thumbnail: '✵✵' },
  { id: 'wedding-kundan-set', name: 'Kundan Set Pattern', nameHi: 'कुंदन सेट पैटर्न', thumbnail: '◈◈' },
  { id: 'wedding-stone-work', name: 'Stone Work', nameHi: 'स्टोन वर्क', thumbnail: '◆◇' },
  { id: 'wedding-crystal', name: 'Crystal Embellishment', nameHi: 'क्रिस्टल अलंकरण', thumbnail: '✧✦' },
  { id: 'wedding-pearl-spray', name: 'Pearl Spray', nameHi: 'मोती स्प्रे', thumbnail: '○○' },
  { id: 'wedding-sequin-heavy', name: 'Heavy Sequin Work', nameHi: 'भारी सीक्विन', thumbnail: '✴✴' },
  { id: 'wedding-gold-thread', name: 'Gold Thread Work', nameHi: 'सोने का धागा', thumbnail: '≋≋' },
  { id: 'wedding-silver-thread', name: 'Silver Thread Work', nameHi: 'चांदी का धागा', thumbnail: '≈≈' },
  { id: 'wedding-dabka-salma', name: 'Dabka Salma Work', nameHi: 'डबका सलमा', thumbnail: '⊛⊛' },
  { id: 'wedding-cutdana', name: 'Cutdana Work', nameHi: 'कटदाना', thumbnail: '⬡⬡' },
  { id: 'wedding-gota-heavy', name: 'Heavy Gota Work', nameHi: 'भारी गोटा', thumbnail: '▰▰' },
  { id: 'wedding-mirror-heavy', name: 'Heavy Mirror Work', nameHi: 'भारी शीशा', thumbnail: '◎◎' },
  { id: 'wedding-butta-scattered', name: 'Scattered Butta', nameHi: 'बिखरे बूटे', thumbnail: '❧❧' },
  { id: 'wedding-jaal', name: 'Jaal Work', nameHi: 'जाल वर्क', thumbnail: '╳╳' },
  { id: 'wedding-tanchoi', name: 'Tanchoi Weave', nameHi: 'तंचोई बुनाई', thumbnail: '▦▦' },
  { id: 'wedding-meenakari', name: 'Meenakari Work', nameHi: 'मीनाकारी', thumbnail: '◑◑' },
  { id: 'wedding-resham-heavy', name: 'Heavy Resham', nameHi: 'भारी रेशम', thumbnail: '∞∞' },
  { id: 'wedding-kasab', name: 'Kasab Work', nameHi: 'कसब वर्क', thumbnail: '※※' },
  { id: 'wedding-kiran', name: 'Kiran Lace', nameHi: 'किरण लेस', thumbnail: '❊❊' },
  { id: 'wedding-marori', name: 'Marori Work', nameHi: 'मरोड़ी वर्क', thumbnail: '❀❀' },
  { id: 'wedding-badla', name: 'Badla Work', nameHi: 'बदला वर्क', thumbnail: '✿✿' },
  { id: 'wedding-mukaish', name: 'Mukaish Work', nameHi: 'मुकैश वर्क', thumbnail: '✧✧' },
  { id: 'wedding-kamdani', name: 'Kamdani Work', nameHi: 'कमदानी वर्क', thumbnail: '✦✦' },
  { id: 'wedding-chatta-patti', name: 'Chatta Patti', nameHi: 'छत्ता पट्टी', thumbnail: '▣▣' },
  { id: 'wedding-kalira', name: 'Kalira Motif', nameHi: 'कलीरे मोटिफ', thumbnail: '⌘⌘' },
  { id: 'wedding-doli', name: 'Doli Design', nameHi: 'डोली डिज़ाइन', thumbnail: '⌂⌂' },
  { id: 'wedding-baraat', name: 'Baraat Motif', nameHi: 'बारात मोटिफ', thumbnail: '♕♕' },
  { id: 'wedding-kalash-diya', name: 'Kalash Diya', nameHi: 'कलश दीया', thumbnail: '⌓⌓' },
  { id: 'wedding-mangal', name: 'Mangal Sutra Motif', nameHi: 'मंगलसूत्र मोटिफ', thumbnail: '⊛○' },
  { id: 'wedding-varmala', name: 'Varmala Design', nameHi: 'वरमाला डिज़ाइन', thumbnail: '◯◯' },
  { id: 'wedding-sindoor', name: 'Sindoor Box Motif', nameHi: 'सिंदूर मोटिफ', thumbnail: '◐◐' },
  { id: 'wedding-mehendi', name: 'Mehendi Pattern', nameHi: 'मेहंदी पैटर्न', thumbnail: '❦❦' },
  { id: 'wedding-shankh', name: 'Shankh Design', nameHi: 'शंख डिज़ाइन', thumbnail: '℈℈' },
  { id: 'wedding-chandbali', name: 'Chandbali Motif', nameHi: 'चांदबाली मोटिफ', thumbnail: '☽☽' },
  { id: 'wedding-jhumka', name: 'Jhumka Motif', nameHi: 'झुमका मोटिफ', thumbnail: '⏣⏣' },
  { id: 'wedding-payal', name: 'Payal Design', nameHi: 'पायल डिज़ाइन', thumbnail: '○-○' },
  { id: 'wedding-bangle', name: 'Bangle Motif', nameHi: 'चूड़ी मोटिफ', thumbnail: '○○○' },
  { id: 'wedding-ring', name: 'Ring Pattern', nameHi: 'अंगूठी पैटर्न', thumbnail: '◎◎' },
  { id: 'wedding-nath', name: 'Nath Design', nameHi: 'नथ डिज़ाइन', thumbnail: '◯⊙' },
  { id: 'wedding-maang-tikka', name: 'Maang Tikka', nameHi: 'मांग टीका', thumbnail: '⊛⊛' },
  { id: 'wedding-hathphool', name: 'Hath Phool', nameHi: 'हाथफूल', thumbnail: '✿○' },
  { id: 'wedding-chooda', name: 'Chooda Pattern', nameHi: 'चूड़ा पैटर्न', thumbnail: '▮▯' },
  { id: 'wedding-sherwani', name: 'Sherwani Motif', nameHi: 'शेरवानी मोटिफ', thumbnail: '▣▣' },
  { id: 'wedding-achkan', name: 'Achkan Pattern', nameHi: 'अचकन पैटर्न', thumbnail: '▦▦' },
  { id: 'wedding-reception', name: 'Reception Style', nameHi: 'रिसेप्शन स्टाइल', thumbnail: '✦✧' },
  { id: 'wedding-sangeet', name: 'Sangeet Motif', nameHi: 'संगीत मोटिफ', thumbnail: '♫♫' },
  { id: 'wedding-haldi', name: 'Haldi Design', nameHi: 'हल्दी डिज़ाइन', thumbnail: '✿❀' },
  { id: 'wedding-mehndi-ceremony', name: 'Mehndi Ceremony', nameHi: 'मेहंदी सेरेमनी', thumbnail: '❦✿' },
  { id: 'wedding-phera', name: 'Phera Motif', nameHi: 'फेरे मोटिफ', thumbnail: '⊙⊙' },
  { id: 'wedding-mandap', name: 'Mandap Design', nameHi: 'मंडप डिज़ाइन', thumbnail: '⌂△' },
  { id: 'wedding-agni', name: 'Agni Pattern', nameHi: 'अग्नि पैटर्न', thumbnail: '△▲' },
  { id: 'wedding-royal', name: 'Royal Wedding', nameHi: 'शाही शादी', thumbnail: '♔♕' },
  { id: 'wedding-palace', name: 'Palace Motif', nameHi: 'महल मोटिफ', thumbnail: '⌂⌂' },
  { id: 'wedding-haveli', name: 'Haveli Design', nameHi: 'हवेली डिज़ाइन', thumbnail: '▣▦' },
];

// ============ FESTIVAL PATTERNS (त्योहार पैटर्न) - 50+ ============
export const FESTIVAL_MOTIFS: DesignMotif[] = [
  { id: 'fest-diwali-diya', name: 'Diwali Diya', nameHi: 'दिवाली दीया', thumbnail: '◔◔' },
  { id: 'fest-diwali-rangoli', name: 'Diwali Rangoli', nameHi: 'दिवाली रंगोली', thumbnail: '❀❀' },
  { id: 'fest-diwali-cracker', name: 'Diwali Festive', nameHi: 'दिवाली उत्सव', thumbnail: '✦✧' },
  { id: 'fest-holi-splash', name: 'Holi Color Splash', nameHi: 'होली रंग', thumbnail: '◐◑' },
  { id: 'fest-holi-pichkari', name: 'Holi Pichkari', nameHi: 'होली पिचकारी', thumbnail: '≋≋' },
  { id: 'fest-holi-gulal', name: 'Gulal Pattern', nameHi: 'गुलाल पैटर्न', thumbnail: '●●' },
  { id: 'fest-navratri-garba', name: 'Garba Design', nameHi: 'गरबा डिज़ाइन', thumbnail: '◎◎' },
  { id: 'fest-navratri-dandiya', name: 'Dandiya Pattern', nameHi: 'डांडिया पैटर्न', thumbnail: '╳╳' },
  { id: 'fest-navratri-durga', name: 'Durga Motif', nameHi: 'दुर्गा मोटिफ', thumbnail: '❋❋' },
  { id: 'fest-ganesh', name: 'Ganesh Chaturthi', nameHi: 'गणेश चतुर्थी', thumbnail: '⊛⊛' },
  { id: 'fest-modak', name: 'Modak Pattern', nameHi: 'मोदक पैटर्न', thumbnail: '◆◆' },
  { id: 'fest-onam-kathakali', name: 'Kathakali Design', nameHi: 'कथकली डिज़ाइन', thumbnail: '◑◐' },
  { id: 'fest-onam-boat', name: 'Onam Boat Race', nameHi: 'ओणम नौका', thumbnail: '▷▷' },
  { id: 'fest-pongal-kolam', name: 'Pongal Kolam', nameHi: 'पोंगल कोलम', thumbnail: '✿✿' },
  { id: 'fest-pongal-pot', name: 'Pongal Pot', nameHi: 'पोंगल बर्तन', thumbnail: '⌓⌓' },
  { id: 'fest-baisakhi', name: 'Baisakhi Pattern', nameHi: 'बैसाखी पैटर्न', thumbnail: '☀☀' },
  { id: 'fest-lohri', name: 'Lohri Design', nameHi: 'लोहड़ी डिज़ाइन', thumbnail: '△▲' },
  { id: 'fest-makar-sankranti', name: 'Sankranti Kite', nameHi: 'संक्रांति पतंग', thumbnail: '◇◇' },
  { id: 'fest-rakhi', name: 'Raksha Bandhan', nameHi: 'रक्षा बंधन', thumbnail: '○●' },
  { id: 'fest-karva-chauth', name: 'Karva Chauth', nameHi: 'करवा चौथ', thumbnail: '☽☽' },
  { id: 'fest-teej', name: 'Teej Festival', nameHi: 'तीज त्योहार', thumbnail: '✿◎' },
  { id: 'fest-eid-moon', name: 'Eid Crescent', nameHi: 'ईद चांद', thumbnail: '☽★' },
  { id: 'fest-eid-lantern', name: 'Eid Lantern', nameHi: 'ईद लालटेन', thumbnail: '⌂⌂' },
  { id: 'fest-eid-star', name: 'Eid Star', nameHi: 'ईद तारा', thumbnail: '★★' },
  { id: 'fest-christmas', name: 'Christmas Design', nameHi: 'क्रिसमस डिज़ाइन', thumbnail: '✦★' },
  { id: 'fest-new-year', name: 'New Year Pattern', nameHi: 'नए साल पैटर्न', thumbnail: '★★' },
  { id: 'fest-ugadi', name: 'Ugadi Design', nameHi: 'उगादी डिज़ाइन', thumbnail: '❀❀' },
  { id: 'fest-vishu', name: 'Vishu Pattern', nameHi: 'विशु पैटर्न', thumbnail: '✿✿' },
  { id: 'fest-bihu', name: 'Bihu Motif', nameHi: 'बिहू मोटिफ', thumbnail: '◎◎' },
  { id: 'fest-puja', name: 'Puja Pattern', nameHi: 'पूजा पैटर्न', thumbnail: '⊛⊛' },
  { id: 'fest-aarti', name: 'Aarti Design', nameHi: 'आरती डिज़ाइन', thumbnail: '◔◔' },
  { id: 'fest-thali', name: 'Puja Thali', nameHi: 'पूजा थाली', thumbnail: '○○' },
  { id: 'fest-bell', name: 'Temple Bell', nameHi: 'मंदिर घंटी', thumbnail: '⌓⌓' },
  { id: 'fest-conch', name: 'Shankh Pattern', nameHi: 'शंख पैटर्न', thumbnail: '℈℈' },
  { id: 'fest-kalash', name: 'Kalash Design', nameHi: 'कलश डिज़ाइन', thumbnail: '⌓▲' },
  { id: 'fest-mango-leaf', name: 'Mango Leaf Toran', nameHi: 'आम पत्ता तोरण', thumbnail: '♠♠' },
  { id: 'fest-marigold', name: 'Marigold Garland', nameHi: 'गेंदे की माला', thumbnail: '❀❀' },
  { id: 'fest-lotus-puja', name: 'Lotus Puja', nameHi: 'कमल पूजा', thumbnail: '✿✿' },
  { id: 'fest-swastik', name: 'Swastik Pattern', nameHi: 'स्वास्तिक पैटर्न', thumbnail: '卍卍' },
  { id: 'fest-om', name: 'Om Pattern', nameHi: 'ओम पैटर्न', thumbnail: '☸☸' },
  { id: 'fest-trishul', name: 'Trishul Motif', nameHi: 'त्रिशूल मोटिफ', thumbnail: '⌇⌇' },
  { id: 'fest-peacock-festive', name: 'Festive Peacock', nameHi: 'उत्सव मोर', thumbnail: '❦❦' },
  { id: 'fest-elephant-festive', name: 'Festive Elephant', nameHi: 'उत्सव हाथी', thumbnail: '◐◐' },
  { id: 'fest-chakra', name: 'Chakra Design', nameHi: 'चक्र डिज़ाइन', thumbnail: '☸☸' },
  { id: 'fest-rudraksha', name: 'Rudraksha Motif', nameHi: 'रुद्राक्ष मोटिफ', thumbnail: '●●' },
  { id: 'fest-tulsi', name: 'Tulsi Pattern', nameHi: 'तुलसी पैटर्न', thumbnail: '❧❧' },
  { id: 'fest-coconut', name: 'Coconut Design', nameHi: 'नारियल डिज़ाइन', thumbnail: '◎◎' },
  { id: 'fest-banana-leaf', name: 'Banana Leaf', nameHi: 'केले का पत्ता', thumbnail: '▭▭' },
];

// ============ REGIONAL ART STYLES (क्षेत्रीय कला) - 60+ ============
export const REGIONAL_ART_MOTIFS: DesignMotif[] = [
  // Rajasthani Art
  { id: 'art-bandhani', name: 'Bandhani Art', nameHi: 'बंधानी कला', thumbnail: '•••' },
  { id: 'art-leheriya', name: 'Leheriya Wave', nameHi: 'लहरिया लहर', thumbnail: '∿∿∿' },
  { id: 'art-gota-patti', name: 'Gota Patti Art', nameHi: 'गोटा पट्टी कला', thumbnail: '▰▰▰' },
  { id: 'art-kundan-meena', name: 'Kundan Meena', nameHi: 'कुंदन मीना', thumbnail: '◈◈◈' },
  { id: 'art-blue-pottery', name: 'Blue Pottery', nameHi: 'नीली पॉटरी', thumbnail: '◎◎◎' },
  { id: 'art-pichwai', name: 'Pichwai Art', nameHi: 'पिछवाई कला', thumbnail: '❀❀❀' },
  { id: 'art-phad', name: 'Phad Painting', nameHi: 'फड़ पेंटिंग', thumbnail: '▤▤▤' },
  
  // Gujarat Art
  { id: 'art-kutch', name: 'Kutch Embroidery', nameHi: 'कच्छ कढ़ाई', thumbnail: '✧✧✧' },
  { id: 'art-patola', name: 'Patola Art', nameHi: 'पटोला कला', thumbnail: '╬╬╬' },
  { id: 'art-suf', name: 'Suf Embroidery', nameHi: 'सूफ कढ़ाई', thumbnail: '▲▲▲' },
  { id: 'art-rabari', name: 'Rabari Work', nameHi: 'रबारी वर्क', thumbnail: '◎◎◎' },
  { id: 'art-ahir', name: 'Ahir Embroidery', nameHi: 'अहीर कढ़ाई', thumbnail: '●●●' },
  { id: 'art-mutwa', name: 'Mutwa Art', nameHi: 'मुतवा कला', thumbnail: '✦✦✦' },
  
  // Punjab Art
  { id: 'art-phulkari', name: 'Phulkari Art', nameHi: 'फुलकारी कला', thumbnail: '❁❁❁' },
  { id: 'art-bagh', name: 'Bagh Pattern', nameHi: 'बाग पैटर्न', thumbnail: '❀❀❀' },
  { id: 'art-chamba-rumal', name: 'Chamba Rumal', nameHi: 'चंबा रुमाल', thumbnail: '✿✿✿' },
  
  // Lucknow/UP Art
  { id: 'art-chikankari', name: 'Chikankari Art', nameHi: 'चिकनकारी कला', thumbnail: '✾✾✾' },
  { id: 'art-shadow-work', name: 'Shadow Work', nameHi: 'शैडो वर्क', thumbnail: '░░░' },
  { id: 'art-jaali', name: 'Jaali Pattern', nameHi: 'जाली पैटर्न', thumbnail: '╳╳╳' },
  { id: 'art-murri', name: 'Murri Work', nameHi: 'मुर्री वर्क', thumbnail: '●○●' },
  { id: 'art-phanda', name: 'Phanda Work', nameHi: 'फंदा वर्क', thumbnail: '○●○' },
  { id: 'art-tepchi', name: 'Tepchi Stitch', nameHi: 'टेपची सिलाई', thumbnail: '---' },
  
  // Bengal Art
  { id: 'art-kantha', name: 'Kantha Stitch', nameHi: 'कांथा सिलाई', thumbnail: '∿∿∿' },
  { id: 'art-nakshi-kantha', name: 'Nakshi Kantha', nameHi: 'नक्शी कांथा', thumbnail: '❀❀❀' },
  { id: 'art-baluchari', name: 'Baluchari Art', nameHi: 'बालूचरी कला', thumbnail: '▣▣▣' },
  { id: 'art-jamdani', name: 'Jamdani Weave', nameHi: 'जामदानी बुनाई', thumbnail: '◇◇◇' },
  
  // South Indian Art
  { id: 'art-kasuti', name: 'Kasuti Embroidery', nameHi: 'कसूती कढ़ाई', thumbnail: '╬╬╬' },
  { id: 'art-lambani', name: 'Lambani Work', nameHi: 'लंबानी वर्क', thumbnail: '◎●◎' },
  { id: 'art-toda', name: 'Toda Embroidery', nameHi: 'टोडा कढ़ाई', thumbnail: '═══' },
  { id: 'art-kerala-mural', name: 'Kerala Mural', nameHi: 'केरल म्यूरल', thumbnail: '◐◑◐' },
  { id: 'art-kalamkari', name: 'Kalamkari Art', nameHi: 'कलमकारी कला', thumbnail: '❧❧❧' },
  { id: 'art-pochampally', name: 'Pochampally Ikat', nameHi: 'पोचमपल्ली इकत', thumbnail: '◆◇◆' },
  { id: 'art-tanjore', name: 'Tanjore Style', nameHi: 'तंजावुर शैली', thumbnail: '✦✦✦' },
  { id: 'art-temple-jewelry', name: 'Temple Jewelry', nameHi: 'मंदिर आभूषण', thumbnail: '◈◈◈' },
  
  // Maharashtra Art
  { id: 'art-warli', name: 'Warli Art', nameHi: 'वारली कला', thumbnail: '△△△' },
  { id: 'art-paithani', name: 'Paithani Art', nameHi: 'पैठानी कला', thumbnail: '▣▣▣' },
  { id: 'art-kolhapuri', name: 'Kolhapuri Style', nameHi: 'कोल्हापुरी शैली', thumbnail: '◎◎◎' },
  
  // Bihar/Jharkhand Art
  { id: 'art-madhubani', name: 'Madhubani Art', nameHi: 'मधुबनी कला', thumbnail: '❀❧❀' },
  { id: 'art-sujni', name: 'Sujni Embroidery', nameHi: 'सुजनी कढ़ाई', thumbnail: '∿∿∿' },
  { id: 'art-godna', name: 'Godna Pattern', nameHi: 'गोदना पैटर्न', thumbnail: '●●●' },
  
  // Odisha Art
  { id: 'art-pipli', name: 'Pipli Applique', nameHi: 'पिपली अप्लीक', thumbnail: '◆◆◆' },
  { id: 'art-pattachitra', name: 'Pattachitra Art', nameHi: 'पटचित्र कला', thumbnail: '▣▣▣' },
  { id: 'art-bomkai', name: 'Bomkai Weave', nameHi: 'बोमकाई बुनाई', thumbnail: '╬╬╬' },
  { id: 'art-sambalpuri', name: 'Sambalpuri Ikat', nameHi: 'संबलपुरी इकत', thumbnail: '◇◆◇' },
  
  // Kashmir Art
  { id: 'art-kashmir-sozni', name: 'Sozni Embroidery', nameHi: 'सोज़नी कढ़ाई', thumbnail: '❀❀❀' },
  { id: 'art-kashmir-aari', name: 'Kashmiri Aari', nameHi: 'कश्मीरी आरी', thumbnail: '✺✺✺' },
  { id: 'art-kashmir-tilla', name: 'Tilla Work', nameHi: 'तिल्ला वर्क', thumbnail: '✦✦✦' },
  { id: 'art-kashmir-papier', name: 'Papier Mache', nameHi: 'पेपर मेश', thumbnail: '◎◎◎' },
  { id: 'art-pashmina', name: 'Pashmina Art', nameHi: 'पश्मीना कला', thumbnail: '≈≈≈' },
  
  // Northeast Art
  { id: 'art-assam-muga', name: 'Muga Silk Art', nameHi: 'मूगा सिल्क कला', thumbnail: '▰▰▰' },
  { id: 'art-assam-mekhela', name: 'Mekhela Pattern', nameHi: 'मेखला पैटर्न', thumbnail: '═══' },
  { id: 'art-manipuri', name: 'Manipuri Design', nameHi: 'मणिपुरी डिज़ाइन', thumbnail: '◇◇◇' },
  { id: 'art-naga', name: 'Naga Pattern', nameHi: 'नागा पैटर्न', thumbnail: '▲▼▲' },
  { id: 'art-mizo', name: 'Mizo Weave', nameHi: 'मिज़ो बुनाई', thumbnail: '═╬═' },
  
  // Mughal Art
  { id: 'art-mughal-jali', name: 'Mughal Jali', nameHi: 'मुग़ल जाली', thumbnail: '╳╳╳' },
  { id: 'art-mughal-floral', name: 'Mughal Floral', nameHi: 'मुग़ल फूल', thumbnail: '❀❀❀' },
  { id: 'art-mughal-paisley', name: 'Mughal Paisley', nameHi: 'मुग़ल बूटा', thumbnail: '❧❧❧' },
  { id: 'art-mughal-geometric', name: 'Mughal Geometric', nameHi: 'मुग़ल ज्यामितीय', thumbnail: '◆◇◆' },
];

// ============ FLORAL & NATURE DESIGNS (फूल और प्रकृति) - 55+ ============
export const FLORAL_NATURE_MOTIFS: DesignMotif[] = [
  // Traditional Indian Flowers
  { id: 'floral-lotus', name: 'Lotus', nameHi: 'कमल', thumbnail: '✿✿' },
  { id: 'floral-rose', name: 'Rose', nameHi: 'गुलाब', thumbnail: '❀❀' },
  { id: 'floral-marigold', name: 'Marigold', nameHi: 'गेंदा', thumbnail: '✾✾' },
  { id: 'floral-jasmine', name: 'Jasmine', nameHi: 'चमेली', thumbnail: '✿✿' },
  { id: 'floral-mogra', name: 'Mogra', nameHi: 'मोगरा', thumbnail: '○○' },
  { id: 'floral-champa', name: 'Champa', nameHi: 'चंपा', thumbnail: '✿✿' },
  { id: 'floral-rajnigandha', name: 'Rajnigandha', nameHi: 'रजनीगंधा', thumbnail: '❀❀' },
  { id: 'floral-hibiscus', name: 'Hibiscus', nameHi: 'गुड़हल', thumbnail: '✿✿' },
  { id: 'floral-sunflower', name: 'Sunflower', nameHi: 'सूरजमुखी', thumbnail: '❀❀' },
  { id: 'floral-palash', name: 'Palash', nameHi: 'पलाश', thumbnail: '✾✾' },
  { id: 'floral-kaner', name: 'Kaner', nameHi: 'कनेर', thumbnail: '✿✿' },
  { id: 'floral-parijat', name: 'Parijat', nameHi: 'पारिजात', thumbnail: '✿✿' },
  { id: 'floral-bougainvillea', name: 'Bougainvillea', nameHi: 'बोगनविलिया', thumbnail: '❀❀' },
  
  // Floral Patterns
  { id: 'floral-bel', name: 'Floral Bel/Vine', nameHi: 'फूल बेल', thumbnail: '❀∿❀' },
  { id: 'floral-bouquet', name: 'Flower Bouquet', nameHi: 'फूल गुलदस्ता', thumbnail: '❀❀❀' },
  { id: 'floral-garland', name: 'Flower Garland', nameHi: 'फूल माला', thumbnail: '○❀○' },
  { id: 'floral-scattered', name: 'Scattered Flowers', nameHi: 'बिखरे फूल', thumbnail: '❀ ❀' },
  { id: 'floral-dense', name: 'Dense Floral', nameHi: 'घने फूल', thumbnail: '❀❀❀' },
  { id: 'floral-sparse', name: 'Sparse Floral', nameHi: 'विरल फूल', thumbnail: '❀ ❀' },
  { id: 'floral-cluster', name: 'Flower Cluster', nameHi: 'फूल गुच्छ', thumbnail: '❀❀' },
  { id: 'floral-abstract', name: 'Abstract Floral', nameHi: 'एब्स्ट्रैक्ट फूल', thumbnail: '◎○' },
  { id: 'floral-vintage', name: 'Vintage Floral', nameHi: 'विंटेज फूल', thumbnail: '❀∿' },
  { id: 'floral-modern', name: 'Modern Floral', nameHi: 'आधुनिक फूल', thumbnail: '○●' },
  { id: 'floral-3d', name: '3D Floral', nameHi: '3D फूल', thumbnail: '◎◎' },
  { id: 'floral-embossed', name: 'Embossed Floral', nameHi: 'उभरे फूल', thumbnail: '▣▣' },
  { id: 'floral-layered', name: 'Layered Floral', nameHi: 'परतदार फूल', thumbnail: '◎○' },
  { id: 'floral-mughal', name: 'Mughal Floral', nameHi: 'मुग़ल फूल', thumbnail: '❀❧' },
  { id: 'floral-persian', name: 'Persian Floral', nameHi: 'फ़ारसी फूल', thumbnail: '❧❀' },
  
  // Leaves & Vines
  { id: 'nature-mango-leaf', name: 'Mango Leaf', nameHi: 'आम का पत्ता', thumbnail: '♠♠' },
  { id: 'nature-peepal-leaf', name: 'Peepal Leaf', nameHi: 'पीपल पत्ता', thumbnail: '♠♠' },
  { id: 'nature-banana-leaf', name: 'Banana Leaf', nameHi: 'केले का पत्ता', thumbnail: '▭▭' },
  { id: 'nature-vine', name: 'Vine Pattern', nameHi: 'बेल पैटर्न', thumbnail: '∿∿∿' },
  { id: 'nature-creeper', name: 'Creeper Design', nameHi: 'लता डिज़ाइन', thumbnail: '≈≈≈' },
  { id: 'nature-fern', name: 'Fern Pattern', nameHi: 'फर्न पैटर्न', thumbnail: '❧❧' },
  { id: 'nature-leaf-spray', name: 'Leaf Spray', nameHi: 'पत्ती स्प्रे', thumbnail: '♠ ♠' },
  
  // Birds
  { id: 'nature-peacock', name: 'Peacock', nameHi: 'मोर', thumbnail: '❦❦' },
  { id: 'nature-peacock-feather', name: 'Peacock Feather', nameHi: 'मोर पंख', thumbnail: '◎◎' },
  { id: 'nature-parrot', name: 'Parrot', nameHi: 'तोता', thumbnail: '◁◁' },
  { id: 'nature-sparrow', name: 'Sparrow', nameHi: 'गौरैया', thumbnail: '◁◁' },
  { id: 'nature-swan', name: 'Swan', nameHi: 'हंस', thumbnail: '≈◁' },
  { id: 'nature-birds-pair', name: 'Bird Pair', nameHi: 'पक्षी जोड़ी', thumbnail: '◁▷' },
  { id: 'nature-flying-birds', name: 'Flying Birds', nameHi: 'उड़ते पक्षी', thumbnail: '◁ ◁' },
  
  // Animals
  { id: 'nature-elephant', name: 'Elephant', nameHi: 'हाथी', thumbnail: '◐◐' },
  { id: 'nature-deer', name: 'Deer', nameHi: 'हिरण', thumbnail: '◁◁' },
  { id: 'nature-horse', name: 'Horse', nameHi: 'घोड़ा', thumbnail: '◁◁' },
  { id: 'nature-camel', name: 'Camel', nameHi: 'ऊंट', thumbnail: '◁◁' },
  { id: 'nature-cow', name: 'Holy Cow', nameHi: 'गाय', thumbnail: '◐◐' },
  { id: 'nature-fish', name: 'Fish', nameHi: 'मछली', thumbnail: '◁▷' },
  { id: 'nature-butterfly', name: 'Butterfly', nameHi: 'तितली', thumbnail: '◁▷' },
  
  // Trees & Plants
  { id: 'nature-tree-of-life', name: 'Tree of Life', nameHi: 'जीवन वृक्ष', thumbnail: '▲▲' },
  { id: 'nature-palm-tree', name: 'Palm Tree', nameHi: 'ताड़ का पेड़', thumbnail: '♠|' },
  { id: 'nature-banyan', name: 'Banyan Tree', nameHi: 'बरगद', thumbnail: '▲▼' },
];

// ============ PAISLEY & BUTTA (पैस्ली और बूटा) - 40+ ============
export const PAISLEY_BUTTA_MOTIFS: DesignMotif[] = [
  { id: 'paisley-classic', name: 'Classic Paisley', nameHi: 'क्लासिक पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-large', name: 'Large Paisley', nameHi: 'बड़ा पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-small', name: 'Small Paisley', nameHi: 'छोटा पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-kashmiri', name: 'Kashmiri Paisley', nameHi: 'कश्मीरी पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-persian', name: 'Persian Paisley', nameHi: 'फ़ारसी पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-mughal', name: 'Mughal Paisley', nameHi: 'मुग़ल पैस्ली', thumbnail: '❧❧' },
  { id: 'paisley-floral', name: 'Floral Paisley', nameHi: 'फूल पैस्ली', thumbnail: '❧❀' },
  { id: 'paisley-scattered', name: 'Scattered Paisley', nameHi: 'बिखरे पैस्ली', thumbnail: '❧ ❧' },
  { id: 'paisley-border', name: 'Paisley Border', nameHi: 'पैस्ली बॉर्डर', thumbnail: '❧❧❧' },
  { id: 'paisley-allover', name: 'Allover Paisley', nameHi: 'पूरे पर पैस्ली', thumbnail: '❧❧❧' },
  { id: 'paisley-chain', name: 'Paisley Chain', nameHi: 'पैस्ली चेन', thumbnail: '❧-❧' },
  { id: 'paisley-cluster', name: 'Paisley Cluster', nameHi: 'पैस्ली गुच्छ', thumbnail: '❧❧❧' },
  { id: 'paisley-modern', name: 'Modern Paisley', nameHi: 'आधुनिक पैस्ली', thumbnail: '◎❧' },
  { id: 'paisley-geometric', name: 'Geometric Paisley', nameHi: 'ज्यामितीय पैस्ली', thumbnail: '◆❧' },
  { id: 'paisley-peacock', name: 'Peacock Paisley', nameHi: 'मोर पैस्ली', thumbnail: '❦❧' },
  
  // Butta/Booti
  { id: 'butta-small', name: 'Small Butta', nameHi: 'छोटा बूटा', thumbnail: '•••' },
  { id: 'butta-large', name: 'Large Butta', nameHi: 'बड़ा बूटा', thumbnail: '●●●' },
  { id: 'butta-floral', name: 'Floral Butta', nameHi: 'फूल बूटा', thumbnail: '❀❀' },
  { id: 'butta-leaf', name: 'Leaf Butta', nameHi: 'पत्ती बूटा', thumbnail: '♠♠' },
  { id: 'butta-scattered', name: 'Scattered Butta', nameHi: 'बिखरे बूटे', thumbnail: '• • •' },
  { id: 'butta-allover', name: 'Allover Butta', nameHi: 'पूरे पर बूटे', thumbnail: '●●●' },
  { id: 'butta-diagonal', name: 'Diagonal Butta', nameHi: 'तिरछे बूटे', thumbnail: '⟋⟋⟋' },
  { id: 'butta-vertical', name: 'Vertical Butta', nameHi: 'खड़े बूटे', thumbnail: '⌇⌇⌇' },
  { id: 'butta-horizontal', name: 'Horizontal Butta', nameHi: 'पड़े बूटे', thumbnail: '───' },
  { id: 'butta-banarasi', name: 'Banarasi Butta', nameHi: 'बनारसी बूटा', thumbnail: '✦✦' },
  { id: 'butta-chanderi', name: 'Chanderi Butta', nameHi: 'चंदेरी बूटा', thumbnail: '◎◎' },
  { id: 'butta-lucknowi', name: 'Lucknowi Butta', nameHi: 'लखनवी बूटा', thumbnail: '✿✿' },
  { id: 'butta-jaal', name: 'Jaal Butta', nameHi: 'जाल बूटा', thumbnail: '╳╳' },
  { id: 'butta-zari', name: 'Zari Butta', nameHi: 'ज़री बूटा', thumbnail: '✵✵' },
  { id: 'butta-resham', name: 'Resham Butta', nameHi: 'रेशम बूटा', thumbnail: '❀❀' },
  { id: 'butta-thread', name: 'Thread Butta', nameHi: 'धागा बूटा', thumbnail: '○○' },
  { id: 'butta-sequin', name: 'Sequin Butta', nameHi: 'सीक्विन बूटा', thumbnail: '✦✦' },
  { id: 'butta-mirror', name: 'Mirror Butta', nameHi: 'शीशा बूटा', thumbnail: '◎◎' },
  { id: 'butta-stone', name: 'Stone Butta', nameHi: 'स्टोन बूटा', thumbnail: '◆◆' },
  { id: 'butta-pearl', name: 'Pearl Butta', nameHi: 'मोती बूटा', thumbnail: '○○' },
  { id: 'butta-kundan', name: 'Kundan Butta', nameHi: 'कुंदन बूटा', thumbnail: '◈◈' },
  { id: 'butta-modern', name: 'Modern Butta', nameHi: 'आधुनिक बूटा', thumbnail: '●○' },
  { id: 'butta-geometric', name: 'Geometric Butta', nameHi: 'ज्यामितीय बूटा', thumbnail: '◆◇' },
  { id: 'butta-abstract', name: 'Abstract Butta', nameHi: 'एब्स्ट्रैक्ट बूटा', thumbnail: '◐◑' },
];

// ============ GEOMETRIC & MODERN (ज्यामितीय और आधुनिक) - 50+ ============
export const GEOMETRIC_MODERN_MOTIFS: DesignMotif[] = [
  // Basic Geometric
  { id: 'geo-diamond', name: 'Diamond Pattern', nameHi: 'हीरा पैटर्न', thumbnail: '◆◇◆' },
  { id: 'geo-triangle', name: 'Triangle Pattern', nameHi: 'त्रिकोण पैटर्न', thumbnail: '▲▼▲' },
  { id: 'geo-square', name: 'Square Pattern', nameHi: 'वर्ग पैटर्न', thumbnail: '▢▢▢' },
  { id: 'geo-hexagon', name: 'Hexagon Pattern', nameHi: 'षट्कोण पैटर्न', thumbnail: '⬡⬡⬡' },
  { id: 'geo-circle', name: 'Circle Pattern', nameHi: 'गोल पैटर्न', thumbnail: '○○○' },
  { id: 'geo-chevron', name: 'Chevron', nameHi: 'शेवरॉन', thumbnail: '>>>>' },
  { id: 'geo-zigzag', name: 'Zigzag', nameHi: 'ज़िगज़ैग', thumbnail: '∿∿∿' },
  { id: 'geo-stripe', name: 'Stripe Pattern', nameHi: 'धारी पैटर्न', thumbnail: '|||' },
  { id: 'geo-check', name: 'Check Pattern', nameHi: 'चेक पैटर्न', thumbnail: '▢▣▢' },
  { id: 'geo-lattice', name: 'Lattice Pattern', nameHi: 'जाली पैटर्न', thumbnail: '╬╬╬' },
  { id: 'geo-trellis', name: 'Trellis Pattern', nameHi: 'ट्रेलिस पैटर्न', thumbnail: '╳╳╳' },
  { id: 'geo-honeycomb', name: 'Honeycomb', nameHi: 'छत्ता पैटर्न', thumbnail: '⬡⬡⬡' },
  { id: 'geo-star', name: 'Star Pattern', nameHi: 'तारा पैटर्न', thumbnail: '★★★' },
  { id: 'geo-dots', name: 'Polka Dots', nameHi: 'पोल्का डॉट्स', thumbnail: '●●●' },
  { id: 'geo-wave', name: 'Wave Pattern', nameHi: 'लहर पैटर्न', thumbnail: '∿∿∿' },
  { id: 'geo-spiral', name: 'Spiral Pattern', nameHi: 'सर्पिल पैटर्न', thumbnail: '◎◎◎' },
  
  // Indian Geometric
  { id: 'geo-mandala', name: 'Mandala', nameHi: 'मंडल', thumbnail: '☸☸' },
  { id: 'geo-rangoli', name: 'Rangoli Pattern', nameHi: 'रंगोली पैटर्न', thumbnail: '❀❀' },
  { id: 'geo-kolam', name: 'Kolam Pattern', nameHi: 'कोलम पैटर्न', thumbnail: '✿✿' },
  { id: 'geo-meenakari', name: 'Meenakari Geo', nameHi: 'मीनाकारी ज्यामिति', thumbnail: '◈◈' },
  { id: 'geo-jaali', name: 'Jaali Pattern', nameHi: 'जाली पैटर्न', thumbnail: '╳╳╳' },
  { id: 'geo-temple', name: 'Temple Pattern', nameHi: 'मंदिर पैटर्न', thumbnail: '▲▲▲' },
  
  // Modern Patterns
  { id: 'modern-abstract', name: 'Abstract Modern', nameHi: 'एब्स्ट्रैक्ट आधुनिक', thumbnail: '◐◑◐' },
  { id: 'modern-minimalist', name: 'Minimalist', nameHi: 'मिनिमलिस्ट', thumbnail: '─ ─' },
  { id: 'modern-color-block', name: 'Color Block', nameHi: 'कलर ब्लॉक', thumbnail: '▮▯▮' },
  { id: 'modern-asymmetric', name: 'Asymmetric', nameHi: 'असममित', thumbnail: '▮ ▯' },
  { id: 'modern-gradient', name: 'Gradient Pattern', nameHi: 'ग्रेडिएंट', thumbnail: '░▒▓' },
  { id: 'modern-ombre', name: 'Ombre Effect', nameHi: 'ओम्ब्रे इफेक्ट', thumbnail: '▓▒░' },
  { id: 'modern-fusion', name: 'Fusion Design', nameHi: 'फ्यूज़न डिज़ाइन', thumbnail: '◐❀' },
  { id: 'modern-contemporary', name: 'Contemporary', nameHi: 'समकालीन', thumbnail: '○●○' },
  { id: 'modern-indo-western', name: 'Indo-Western', nameHi: 'इंडो-वेस्टर्न', thumbnail: '▮❀' },
  
  // Ikat & Weave Patterns
  { id: 'weave-ikat', name: 'Ikat Pattern', nameHi: 'इकत पैटर्न', thumbnail: '◆◇◆' },
  { id: 'weave-pochampally', name: 'Pochampally', nameHi: 'पोचमपल्ली', thumbnail: '◇◆◇' },
  { id: 'weave-patola', name: 'Patola Weave', nameHi: 'पटोला बुनाई', thumbnail: '╬╬╬' },
  { id: 'weave-kantha', name: 'Kantha Stitch', nameHi: 'कांथा सिलाई', thumbnail: '∿∿∿' },
  { id: 'weave-jamdani', name: 'Jamdani Weave', nameHi: 'जामदानी बुनाई', thumbnail: '◇◇◇' },
  { id: 'weave-banarasi', name: 'Banarasi Weave', nameHi: 'बनारसी बुनाई', thumbnail: '▣▣▣' },
  { id: 'weave-chanderi', name: 'Chanderi Weave', nameHi: 'चंदेरी बुनाई', thumbnail: '║║║' },
  { id: 'weave-tussar', name: 'Tussar Weave', nameHi: 'तसर बुनाई', thumbnail: '≡≡≡' },
  { id: 'weave-khadi', name: 'Khadi Weave', nameHi: 'खादी बुनाई', thumbnail: '═══' },
  { id: 'weave-cotton', name: 'Cotton Weave', nameHi: 'सूती बुनाई', thumbnail: '|||' },
  
  // Print Patterns
  { id: 'print-block', name: 'Block Print', nameHi: 'ब्लॉक प्रिंट', thumbnail: '▣▣▣' },
  { id: 'print-batik', name: 'Batik Print', nameHi: 'बाटिक प्रिंट', thumbnail: '◐◑◐' },
  { id: 'print-dabu', name: 'Dabu Print', nameHi: 'दाबू प्रिंट', thumbnail: '▢▢▢' },
  { id: 'print-ajrakh', name: 'Ajrakh Print', nameHi: 'अजरख प्रिंट', thumbnail: '◆◇◆' },
  { id: 'print-bagru', name: 'Bagru Print', nameHi: 'बाग़रू प्रिंट', thumbnail: '❀❀❀' },
  { id: 'print-sanganer', name: 'Sanganer Print', nameHi: 'सांगानेर प्रिंट', thumbnail: '❀❀❀' },
  { id: 'print-kalamkari', name: 'Kalamkari Print', nameHi: 'कलमकारी प्रिंट', thumbnail: '❧❧❧' },
  { id: 'print-digital', name: 'Digital Print', nameHi: 'डिजिटल प्रिंट', thumbnail: '●●●' },
];

// ============ EMBROIDERY STYLES (कढ़ाई शैलियां) - 50+ ============
export const EMBROIDERY_STYLE_MOTIFS: DesignMotif[] = [
  // Traditional Embroidery
  { id: 'emb-chikankari', name: 'Chikankari', nameHi: 'चिकनकारी', thumbnail: '✾✾' },
  { id: 'emb-phulkari', name: 'Phulkari', nameHi: 'फुलकारी', thumbnail: '❁❁' },
  { id: 'emb-kashida', name: 'Kashida', nameHi: 'काशीदा', thumbnail: '❀❀' },
  { id: 'emb-kantha', name: 'Kantha', nameHi: 'कांथा', thumbnail: '∿∿' },
  { id: 'emb-zardozi', name: 'Zardozi', nameHi: 'ज़रदोज़ी', thumbnail: '✵✵' },
  { id: 'emb-aari', name: 'Aari Work', nameHi: 'आरी वर्क', thumbnail: '✺✺' },
  { id: 'emb-kasuti', name: 'Kasuti', nameHi: 'कसूती', thumbnail: '╬╬' },
  { id: 'emb-kutchi', name: 'Kutchi', nameHi: 'कच्छी', thumbnail: '✧✧' },
  { id: 'emb-mirror', name: 'Mirror Work', nameHi: 'शीशा वर्क', thumbnail: '◎◎' },
  { id: 'emb-gota', name: 'Gota Patti', nameHi: 'गोटा पट्टी', thumbnail: '▰▰' },
  { id: 'emb-dabka', name: 'Dabka Work', nameHi: 'डबका वर्क', thumbnail: '⊛⊛' },
  { id: 'emb-mukaish', name: 'Mukaish', nameHi: 'मुकैश', thumbnail: '✧✧' },
  { id: 'emb-badla', name: 'Badla Work', nameHi: 'बदला वर्क', thumbnail: '✿✿' },
  { id: 'emb-sozni', name: 'Sozni', nameHi: 'सोज़नी', thumbnail: '❀❀' },
  { id: 'emb-tilla', name: 'Tilla Work', nameHi: 'तिल्ला वर्क', thumbnail: '✦✦' },
  
  // Embroidery Placements
  { id: 'emb-yoke', name: 'Yoke Embroidery', nameHi: 'योक कढ़ाई', thumbnail: '▲▲' },
  { id: 'emb-neckline', name: 'Neckline Work', nameHi: 'गला कढ़ाई', thumbnail: '⌒⌒' },
  { id: 'emb-sleeves', name: 'Sleeve Embroidery', nameHi: 'आस्तीन कढ़ाई', thumbnail: '||' },
  { id: 'emb-border', name: 'Border Embroidery', nameHi: 'बॉर्डर कढ़ाई', thumbnail: '═══' },
  { id: 'emb-hemline', name: 'Hemline Work', nameHi: 'हेमलाइन कढ़ाई', thumbnail: '───' },
  { id: 'emb-allover', name: 'Allover Embroidery', nameHi: 'पूरे पर कढ़ाई', thumbnail: '❀❀❀' },
  { id: 'emb-center', name: 'Center Panel', nameHi: 'सेंटर पैनल', thumbnail: '|❀|' },
  { id: 'emb-back', name: 'Back Embroidery', nameHi: 'पीछे कढ़ाई', thumbnail: '▣▣' },
  { id: 'emb-daman', name: 'Daman Work', nameHi: 'दामन वर्क', thumbnail: '≈≈≈' },
  
  // Embroidery Techniques
  { id: 'emb-thread', name: 'Thread Work', nameHi: 'धागा वर्क', thumbnail: '≈≈' },
  { id: 'emb-resham', name: 'Resham Work', nameHi: 'रेशम वर्क', thumbnail: '∞∞' },
  { id: 'emb-zari', name: 'Zari Work', nameHi: 'ज़री वर्क', thumbnail: '✵✵' },
  { id: 'emb-sequin', name: 'Sequin Work', nameHi: 'सीक्विन वर्क', thumbnail: '✦✦' },
  { id: 'emb-beaded', name: 'Beaded Work', nameHi: 'मोती वर्क', thumbnail: '○○' },
  { id: 'emb-stone', name: 'Stone Work', nameHi: 'स्टोन वर्क', thumbnail: '◆◆' },
  { id: 'emb-crystal', name: 'Crystal Work', nameHi: 'क्रिस्टल वर्क', thumbnail: '◇◇' },
  { id: 'emb-kundan', name: 'Kundan Work', nameHi: 'कुंदन वर्क', thumbnail: '◈◈' },
  { id: 'emb-applique', name: 'Applique Work', nameHi: 'अप्लीक वर्क', thumbnail: '◐◐' },
  { id: 'emb-patchwork', name: 'Patchwork', nameHi: 'पैचवर्क', thumbnail: '▧▧' },
  { id: 'emb-cutwork', name: 'Cutwork', nameHi: 'कटवर्क', thumbnail: '╳╳' },
  { id: 'emb-shadow', name: 'Shadow Work', nameHi: 'शैडो वर्क', thumbnail: '░░' },
  { id: 'emb-raised', name: 'Raised Work', nameHi: 'उभरी कढ़ाई', thumbnail: '▣▣' },
  { id: 'emb-flat', name: 'Flat Embroidery', nameHi: 'सपाट कढ़ाई', thumbnail: '▢▢' },
  
  // Density
  { id: 'emb-heavy', name: 'Heavy Embroidery', nameHi: 'भारी कढ़ाई', thumbnail: '●●●' },
  { id: 'emb-medium', name: 'Medium Embroidery', nameHi: 'मध्यम कढ़ाई', thumbnail: '●●' },
  { id: 'emb-light', name: 'Light Embroidery', nameHi: 'हल्की कढ़ाई', thumbnail: '●' },
  { id: 'emb-scattered', name: 'Scattered Work', nameHi: 'बिखरी कढ़ाई', thumbnail: '● ●' },
  { id: 'emb-dense', name: 'Dense Work', nameHi: 'घनी कढ़ाई', thumbnail: '●●●' },
  { id: 'emb-delicate', name: 'Delicate Work', nameHi: 'नाज़ुक कढ़ाई', thumbnail: '○○' },
];

// ============ NECKLINE & PLACEMENT DESIGNS (गला और प्लेसमेंट) - 45+ ============
export const NECKLINE_PLACEMENT_MOTIFS: DesignMotif[] = [
  // Neckline Designs
  { id: 'neck-round-embr', name: 'Round Neck Design', nameHi: 'गोल गला डिज़ाइन', thumbnail: '○○' },
  { id: 'neck-v-embr', name: 'V-Neck Design', nameHi: 'वी गला डिज़ाइन', thumbnail: '∨∨' },
  { id: 'neck-square-embr', name: 'Square Neck Design', nameHi: 'स्क्वायर गला डिज़ाइन', thumbnail: '▢▢' },
  { id: 'neck-boat-embr', name: 'Boat Neck Design', nameHi: 'बोट नेक डिज़ाइन', thumbnail: '⌒⌒' },
  { id: 'neck-keyhole', name: 'Keyhole Design', nameHi: 'कीहोल डिज़ाइन', thumbnail: '○|' },
  { id: 'neck-mandarin', name: 'Mandarin Collar', nameHi: 'मंदारिन कॉलर', thumbnail: '||' },
  { id: 'neck-collar-embr', name: 'Collar Design', nameHi: 'कॉलर डिज़ाइन', thumbnail: '⌃⌃' },
  { id: 'neck-high-embr', name: 'High Neck Design', nameHi: 'हाई नेक डिज़ाइन', thumbnail: '|○|' },
  { id: 'neck-sweetheart', name: 'Sweetheart Design', nameHi: 'स्वीटहार्ट डिज़ाइन', thumbnail: '❤❤' },
  { id: 'neck-angrakha', name: 'Angrakha Style', nameHi: 'अंगरखा स्टाइल', thumbnail: '∨╳' },
  { id: 'neck-asymmetric', name: 'Asymmetric Neck', nameHi: 'असममित गला', thumbnail: '╱╲' },
  { id: 'neck-slit', name: 'Slit Neck Design', nameHi: 'स्लिट गला', thumbnail: '|─|' },
  { id: 'neck-tie-up', name: 'Tie-Up Neck', nameHi: 'टाई-अप गला', thumbnail: '╳╳' },
  { id: 'neck-button-placket', name: 'Button Placket', nameHi: 'बटन प्लैकेट', thumbnail: '●●●' },
  { id: 'neck-potli', name: 'Potli Buttons', nameHi: 'पोटली बटन', thumbnail: '○○○' },
  
  // Yoke Designs
  { id: 'yoke-straight', name: 'Straight Yoke', nameHi: 'सीधा योक', thumbnail: '═══' },
  { id: 'yoke-curved', name: 'Curved Yoke', nameHi: 'गोल योक', thumbnail: '⌒⌒⌒' },
  { id: 'yoke-v-shaped', name: 'V-Shaped Yoke', nameHi: 'वी योक', thumbnail: '∨∨∨' },
  { id: 'yoke-princess', name: 'Princess Yoke', nameHi: 'प्रिंसेस योक', thumbnail: '◠◡◠' },
  { id: 'yoke-empire', name: 'Empire Yoke', nameHi: 'एम्पायर योक', thumbnail: '═⌒═' },
  { id: 'yoke-gathered', name: 'Gathered Yoke', nameHi: 'गेदरेड योक', thumbnail: '≈≈≈' },
  { id: 'yoke-panel', name: 'Panel Yoke', nameHi: 'पैनल योक', thumbnail: '|▣|' },
  { id: 'yoke-embroidered', name: 'Embroidered Yoke', nameHi: 'कढ़ाई वाला योक', thumbnail: '❀❀❀' },
  { id: 'yoke-printed', name: 'Printed Yoke', nameHi: 'प्रिंटेड योक', thumbnail: '▤▤▤' },
  
  // Center Panel
  { id: 'center-vertical', name: 'Vertical Panel', nameHi: 'खड़ा पैनल', thumbnail: '|▣|' },
  { id: 'center-broad', name: 'Broad Center', nameHi: 'चौड़ा सेंटर', thumbnail: '|█|' },
  { id: 'center-narrow', name: 'Narrow Center', nameHi: 'पतला सेंटर', thumbnail: '|│|' },
  { id: 'center-embroidered', name: 'Embroidered Center', nameHi: 'कढ़ाई सेंटर', thumbnail: '|❀|' },
  { id: 'center-printed', name: 'Printed Center', nameHi: 'प्रिंटेड सेंटर', thumbnail: '|▤|' },
  { id: 'center-contrast', name: 'Contrast Center', nameHi: 'कंट्रास्ट सेंटर', thumbnail: '|▮|' },
  
  // Sleeve Designs
  { id: 'sleeve-embr', name: 'Embroidered Sleeves', nameHi: 'कढ़ाई आस्तीन', thumbnail: '❀|' },
  { id: 'sleeve-border', name: 'Sleeve Border', nameHi: 'आस्तीन बॉर्डर', thumbnail: '═|' },
  { id: 'sleeve-cuff', name: 'Cuff Design', nameHi: 'कफ डिज़ाइन', thumbnail: '▮|' },
  { id: 'sleeve-bell-embr', name: 'Bell Sleeve Design', nameHi: 'बेल आस्तीन डिज़ाइन', thumbnail: '◠|' },
  { id: 'sleeve-flutter', name: 'Flutter Sleeve', nameHi: 'फ्लटर आस्तीन', thumbnail: '∿|' },
  { id: 'sleeve-ruffle', name: 'Ruffle Sleeve', nameHi: 'रफल आस्तीन', thumbnail: '≈|' },
  
  // Daman/Hemline
  { id: 'daman-straight', name: 'Straight Daman', nameHi: 'सीधा दामन', thumbnail: '───' },
  { id: 'daman-curved', name: 'Curved Daman', nameHi: 'गोल दामन', thumbnail: '⌒⌒⌒' },
  { id: 'daman-asymmetric', name: 'Asymmetric Daman', nameHi: 'असममित दामन', thumbnail: '╱──' },
  { id: 'daman-scallop', name: 'Scallop Daman', nameHi: 'स्कैलप दामन', thumbnail: '⌒⌒⌒' },
  { id: 'daman-embroidered', name: 'Embroidered Daman', nameHi: 'कढ़ाई दामन', thumbnail: '❀──' },
  { id: 'daman-heavy', name: 'Heavy Daman', nameHi: 'भारी दामन', thumbnail: '▓──' },
  { id: 'daman-border', name: 'Border Daman', nameHi: 'बॉर्डर दामन', thumbnail: '═══' },
];

// ============ TEXTURE & SURFACE DESIGNS (बनावट और सतह) - 30+ ============
export const TEXTURE_SURFACE_MOTIFS: DesignMotif[] = [
  { id: 'texture-pleated', name: 'Pleated Texture', nameHi: 'प्लीटेड बनावट', thumbnail: '|||' },
  { id: 'texture-gathered', name: 'Gathered Texture', nameHi: 'गेदरेड बनावट', thumbnail: '≈≈≈' },
  { id: 'texture-pintuck', name: 'Pintuck', nameHi: 'पिनटक', thumbnail: '───' },
  { id: 'texture-crush', name: 'Crush Texture', nameHi: 'क्रश बनावट', thumbnail: '∿∿∿' },
  { id: 'texture-crinkle', name: 'Crinkle', nameHi: 'क्रिंकल', thumbnail: '≋≋≋' },
  { id: 'texture-ruffle', name: 'Ruffle', nameHi: 'रफल', thumbnail: '⌒⌒⌒' },
  { id: 'texture-frill', name: 'Frill', nameHi: 'फ्रिल', thumbnail: '~~~' },
  { id: 'texture-layered', name: 'Layered', nameHi: 'परतदार', thumbnail: '═══' },
  { id: 'texture-tiered', name: 'Tiered', nameHi: 'टियर्ड', thumbnail: '▭▭▭' },
  { id: 'texture-smocked', name: 'Smocked', nameHi: 'स्मॉक्ड', thumbnail: '◆◇◆' },
  { id: 'texture-quilted', name: 'Quilted', nameHi: 'क्विल्टेड', thumbnail: '◇◆◇' },
  { id: 'texture-embossed', name: 'Embossed', nameHi: 'उभरा', thumbnail: '▣▣▣' },
  { id: 'texture-burnout', name: 'Burnout', nameHi: 'बर्नआउट', thumbnail: '░░░' },
  { id: 'texture-laser-cut', name: 'Laser Cut', nameHi: 'लेज़र कट', thumbnail: '╳╳╳' },
  { id: 'texture-flocked', name: 'Flocked', nameHi: 'फ्लॉक्ड', thumbnail: '▓▓▓' },
  { id: 'texture-velvet', name: 'Velvet Texture', nameHi: 'वेलवेट बनावट', thumbnail: '▓▓▓' },
  { id: 'texture-satin', name: 'Satin Finish', nameHi: 'साटिन फिनिश', thumbnail: '═══' },
  { id: 'texture-matte', name: 'Matte Finish', nameHi: 'मैट फिनिश', thumbnail: '───' },
  { id: 'texture-shimmer', name: 'Shimmer', nameHi: 'शिमर', thumbnail: '✦✦✦' },
  { id: 'texture-metallic', name: 'Metallic', nameHi: 'मेटैलिक', thumbnail: '✵✵✵' },
  { id: 'texture-lace-overlay', name: 'Lace Overlay', nameHi: 'लेस ओवरले', thumbnail: '❋❋❋' },
  { id: 'texture-net-overlay', name: 'Net Overlay', nameHi: 'नेट ओवरले', thumbnail: '╳╳╳' },
  { id: 'texture-organza', name: 'Organza Layer', nameHi: 'ऑर्गेंज़ा लेयर', thumbnail: '░░░' },
  { id: 'texture-jacquard', name: 'Jacquard', nameHi: 'जैकार्ड', thumbnail: '▣▣▣' },
  { id: 'texture-brocade', name: 'Brocade', nameHi: 'ब्रोकेड', thumbnail: '❖❖❖' },
  { id: 'texture-tissue', name: 'Tissue', nameHi: 'टिश्यू', thumbnail: '░░░' },
  { id: 'texture-raw-silk', name: 'Raw Silk', nameHi: 'रॉ सिल्क', thumbnail: '≡≡≡' },
  { id: 'texture-cotton-slub', name: 'Cotton Slub', nameHi: 'कॉटन स्लब', thumbnail: '───' },
  { id: 'texture-linen', name: 'Linen Texture', nameHi: 'लिनन बनावट', thumbnail: '|||' },
  { id: 'texture-georgette', name: 'Georgette', nameHi: 'जॉर्जेट', thumbnail: '∿∿∿' },
];

// ============ GROUP ALL MOTIFS ============
export const DESIGN_MOTIF_GROUPS: DesignMotifGroup[] = [
  {
    label: 'Traditional Borders',
    labelHi: 'पारंपरिक बॉर्डर',
    icon: '═══',
    motifs: TRADITIONAL_BORDER_MOTIFS,
  },
  {
    label: 'Wedding & Bridal',
    labelHi: 'शादी और दुल्हन',
    icon: '✵✵',
    motifs: WEDDING_MOTIFS,
  },
  {
    label: 'Festival Patterns',
    labelHi: 'त्योहार पैटर्न',
    icon: '◔◔',
    motifs: FESTIVAL_MOTIFS,
  },
  {
    label: 'Regional Art Styles',
    labelHi: 'क्षेत्रीय कला शैली',
    icon: '❀❧',
    motifs: REGIONAL_ART_MOTIFS,
  },
  {
    label: 'Floral & Nature',
    labelHi: 'फूल और प्रकृति',
    icon: '❀❀',
    motifs: FLORAL_NATURE_MOTIFS,
  },
  {
    label: 'Paisley & Butta',
    labelHi: 'पैस्ली और बूटा',
    icon: '❧❧',
    motifs: PAISLEY_BUTTA_MOTIFS,
  },
  {
    label: 'Geometric & Modern',
    labelHi: 'ज्यामितीय और आधुनिक',
    icon: '◆◇',
    motifs: GEOMETRIC_MODERN_MOTIFS,
  },
  {
    label: 'Embroidery Styles',
    labelHi: 'कढ़ाई शैलियां',
    icon: '✾✾',
    motifs: EMBROIDERY_STYLE_MOTIFS,
  },
  {
    label: 'Neckline & Placement',
    labelHi: 'गला और प्लेसमेंट',
    icon: '⌒⌒',
    motifs: NECKLINE_PLACEMENT_MOTIFS,
  },
  {
    label: 'Texture & Surface',
    labelHi: 'बनावट और सतह',
    icon: '≈≈',
    motifs: TEXTURE_SURFACE_MOTIFS,
  },
];

// Helper functions
export const getMotifName = (id: string): string => {
  for (const group of DESIGN_MOTIF_GROUPS) {
    const motif = group.motifs.find(m => m.id === id);
    if (motif) return motif.name;
  }
  return id;
};

export const getMotifHindi = (id: string): string => {
  for (const group of DESIGN_MOTIF_GROUPS) {
    const motif = group.motifs.find(m => m.id === id);
    if (motif) return motif.nameHi;
  }
  return id;
};

export const getMotifThumbnail = (id: string): string => {
  for (const group of DESIGN_MOTIF_GROUPS) {
    const motif = group.motifs.find(m => m.id === id);
    if (motif) return motif.thumbnail;
  }
  return '●●';
};

// Export total count
export const TOTAL_MOTIF_COUNT = DESIGN_MOTIF_GROUPS.reduce(
  (sum, group) => sum + group.motifs.length,
  0
);
