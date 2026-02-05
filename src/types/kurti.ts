export interface ImageMarker {
  id: string;
  x: number; // percentage
  y: number; // percentage
  changeType: MarkerChangeType;
  note: string;
}

export type MarkerChangeType =
  | 'change-color'
  | 'change-design'
  | 'add-embroidery'
  | 'change-pattern'
  | 'remove-element'
  | 'custom';

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  markers: ImageMarker[];
}

// Motif placement tracking
export interface MotifPlacement {
  motifId: string;
  placements: string[];
}

// Placement options for design motifs
export const MOTIF_PLACEMENT_OPTIONS = [
  'Front Center',
  'Front All-Over',
  'Back Center',
  'Back All-Over',
  'Left Side',
  'Right Side',
  'Both Sides',
  'Sleeves',
  'Neckline',
  'Border',
  'Hemline',
  'All Over'
] as const;

export interface DesignFactors {
  color: string[];
  customColor: string;
  fabric: string[];
  embroidery: string[];
  embroideryDensity: 'light' | 'medium' | 'heavy' | '';
  neckline: string[];
  sleeves: string[];
  length: string[];
  silhouette: string[];
  borderStyle: string[];
  printTechnique: string[];
  occasion: string[];
  embellishments: string[];
  backDesign: string[];
  slitStyle: string[];
  hemlineStyle: string[];
  collarStyle: string[];
  placketStyle: string[];
  panelDesign: string[];
  yokeStyle: string[];
  cuffStyle: string[];
  pocketStyle: string[];
  closureType: string[];
  liningType: string[];
  finishingDetails: string[];
  motifPattern: string[];
  colorCombination: string[];
  seasonalStyle: string[];
  bodyType: string[];
  ageGroup: string[];
  // Model Display Options
  modelSkinTone: string[];
  modelHeight: string[];
  modelPose: string[];
  // Design Motifs (500+ designs)
  designMotifs: string[];
  motifPlacements: MotifPlacement[];
}

export type PromptStyle = 'short' | 'detailed' | 'professional';

export const DESIGN_OPTIONS = {
  // Color Options (35+ options)
  color: [
    'Pastel Pink', 'Pastel Blue', 'Pastel Green', 'Pastel Yellow', 'Pastel Lavender', 'Pastel Peach', 'Pastel Mint',
    'Bright Red', 'Bright Orange', 'Bright Yellow', 'Bright Green', 'Bright Blue', 'Bright Pink', 'Bright Purple',
    'Dark Maroon', 'Dark Navy', 'Dark Green', 'Dark Brown', 'Dark Grey', 'Black', 'Dark Wine', 'Dark Teal',
    'Dual-tone', 'Multi-color', 'Ombre', 'Gradient',
    'Royal Blue', 'Emerald Green', 'Ruby Red', 'Sapphire Blue', 'Golden Yellow', 'Rose Gold', 'Silver Grey',
    'Ivory', 'Cream', 'Beige', 'Off-White', 'Pure White', 'Coral', 'Turquoise', 'Magenta', 'Mustard',
    // Extended colors (50+ new)
    'Blush Pink', 'Hot Pink', 'Salmon Pink', 'Dusty Pink', 'Fuchsia', 'Crimson', 'Burgundy', 'Scarlet', 'Vermillion', 'Cherry Red',
    'Tangerine', 'Burnt Orange', 'Rust', 'Apricot', 'Terracotta', 'Pumpkin', 'Copper Orange', 'Saffron',
    'Lemon Yellow', 'Canary Yellow', 'Turmeric Yellow', 'Marigold', 'Honey Gold', 'Butter Yellow',
    'Olive Green', 'Sage Green', 'Forest Green', 'Bottle Green', 'Parrot Green', 'Sea Green', 'Lime Green', 'Jade Green', 'Mint Green',
    'Sky Blue', 'Teal Blue', 'Cobalt Blue', 'Peacock Blue', 'Indigo', 'Persian Blue', 'Powder Blue', 'Aqua Blue', 'Denim Blue',
    'Violet', 'Plum', 'Mauve', 'Orchid', 'Lilac', 'Grape Purple', 'Aubergine', 'Wine Purple', 'Royal Purple', 'Amethyst',
    'Charcoal', 'Slate Grey', 'Ash Grey', 'Graphite', 'Gunmetal', 'Pearl White', 'Champagne', 'Vanilla', 'Ecru', 'Bone White',
    'Chocolate Brown', 'Coffee Brown', 'Caramel', 'Tan', 'Mocha', 'Chestnut', 'Walnut', 'Mahogany', 'Cocoa',
    'Antique Gold', 'Bright Gold', 'Champagne Gold', 'Bronze', 'Copper', 'Silver', 'Platinum',
    'Tie-Dye Effect', 'Color Block', 'Rainbow', 'Contrast Combination'
  ] as const,

  // Fabric Options (70+ options)
  fabric: [
    // Cotton varieties
    'Pure Cotton', 'Handloom Cotton', 'Slub Cotton', 'Cotton Silk', 'Cotton Linen', 'Khadi Cotton', 'Organic Cotton', 'Jacquard Cotton', 'Mercerized Cotton', 'Pima Cotton', 'Egyptian Cotton', 'Voile Cotton', 'Poplin Cotton',
    // Silk varieties
    'Pure Silk', 'Art Silk', 'Raw Silk', 'Tussar Silk', 'Banarasi Silk', 'Kanjivaram Silk', 'Patola Silk', 'Mysore Silk', 'Chanderi Silk', 'Muga Silk', 'Eri Silk', 'Bhagalpuri Silk', 'Uppada Silk', 'Pochampally Silk', 'Paithani Silk', 'Banglori Silk', 'Dupion Silk', 'Mulberry Silk',
    // Rayon varieties
    'Rayon', 'Modal Rayon', 'Viscose Rayon', 'Rayon Crepe', 'Rayon Slub', 'Rayon Twill',
    // Linen varieties
    'Pure Linen', 'Linen Blend', 'Handloom Linen', 'Belgian Linen', 'Irish Linen', 'Linen Cotton',
    // Georgette varieties
    'Georgette', 'Faux Georgette', 'Heavy Georgette', 'Chiffon Georgette', 'Satin Georgette', 'Embroidered Georgette',
    // Crepe varieties
    'Crepe', 'Moss Crepe', 'Satin Crepe', 'French Crepe', 'Crepe de Chine', 'Japan Crepe', 'Double Crepe',
    // Other fabrics
    'Chanderi', 'Maheshwari', 'Kota Doria', 'Organza', 'Net', 'Velvet', 'Brocade', 'Jacquard', 'Satin', 'Lycra Blend', 'Muslin', 'Cambric',
    // Extended fabrics (25+ new)
    'Chiffon', 'Taffeta', 'Tissue', 'Shimmer Fabric', 'Khadi Silk', 'Phulkari Fabric', 'Bandhani Fabric', 'Kalamkari Fabric',
    'Handwoven Fabric', 'Khaddar', 'Terry Rayon', 'Poly Silk', 'Poly Cotton', 'Synthetic Blend', 'Stretch Cotton',
    'Cotton Dobby', 'Cotton Cambric', 'Cotton Voile', 'Cotton Sateen', 'Silk Blend', 'Wool Blend', 'Pashmina',
    'Cashmere Blend', 'Suede', 'Corduroy', 'Denim', 'Tweed', 'Bamboo Fabric', 'Hemp Fabric'
  ] as const,

  // Embroidery Styles (60+ options)
  embroidery: [
    // Traditional
    'Chikankari', 'Lucknowi Chikan', 'Phulkari', 'Kantha', 'Kashida', 'Aari', 'Zardozi', 'Gota Patti', 'Dabka', 'Kashmiri Embroidery', 'Kutchi Work', 'Parsi Gara', 'Sindhi Embroidery', 'Rabari Embroidery', 'Suf Embroidery',
    // Thread work
    'Thread Work', 'Resham Work', 'French Knot', 'Cross Stitch', 'Chain Stitch', 'Satin Stitch', 'Shadow Work', 'Running Stitch', 'Blanket Stitch', 'Backstitch', 'Stem Stitch', 'Herringbone Stitch', 'Feather Stitch',
    // Metal work
    'Zari Work', 'Gold Zari', 'Silver Zari', 'Copper Zari', 'Antique Zari', 'Metallic Thread Work', 'Mukaish Work', 'Badla Work',
    // Embellishments
    'Mirror Work', 'Sequin Work', 'Bead Work', 'Pearl Work', 'Stone Work', 'Kundan Work', 'Crystal Work', 'Rhinestone Work', 'Gem Work', 'Shell Work', 'Coin Work',
    // Modern
    'Cutwork', 'Applique', 'Patchwork', 'Ribbon Work', 'Laser Cut', '3D Embroidery', 'Machine Embroidery', 'Computer Embroidery', 'Digital Embroidery', 'Thread Painting', 'Fabric Manipulation',
    'None'
  ] as const,

  // Neckline Styles (45+ options)
  neckline: [
    // Basic
    'Round Neck', 'Deep Round', 'Shallow Round', 'U-Neck', 'Scoop Neck', 'Jewel Neck', 'Crew Neck',
    // V-variations
    'V-Neck', 'Deep V-Neck', 'Sweetheart', 'Notched V', 'Plunging V', 'Split V',
    // Square/Rectangular
    'Square Neck', 'Wide Square', 'Boat Neck', 'Bateau Neck', 'Straight Across', 'Wide Boat',
    // Collar types
    'Mandarin Collar', 'Chinese Collar', 'Band Collar', 'Peter Pan Collar', 'Nehru Collar', 'Shirt Collar', 'Stand Collar', 'Wing Collar', 'Spread Collar', 'Club Collar', 'Eton Collar',
    // Special
    'Keyhole', 'Teardrop', 'Halter', 'High Neck', 'Turtle Neck', 'Cowl Neck', 'Drape Neck', 'Surplice', 'Wrap Neck', 'Asymmetric Neck', 'One Shoulder Neck', 'Illusion Neck',
    // Decorated
    'Embroidered Neckline', 'Piping Neck', 'Lace Trim Neck', 'Tassel Neck', 'Button Placket', 'Zari Border Neck'
  ] as const,

  // Sleeve Styles (45+ options)
  sleeves: [
    // Length
    'Sleeveless', 'Cap Sleeves', 'Short Sleeves', 'Elbow Length', '3/4 Sleeves', 'Full Sleeves', 'Extra Long', 'Quarter Sleeves', 'Half Sleeves', 'Above Elbow',
    // Shapes
    'Bell Sleeves', 'Flutter Sleeves', 'Puff Sleeves', 'Balloon Sleeves', 'Lantern Sleeves', 'Bishop Sleeves', 'Trumpet Sleeves', 'Angel Sleeves', 'Juliet Sleeves', 'Leg of Mutton Sleeves', 'Melon Sleeves', 'Peasant Sleeves',
    // Fitted
    'Fitted Sleeves', 'Slim Sleeves', 'Straight Sleeves', 'Tailored Sleeves', 'Set-in Sleeves',
    // Special
    'Cold Shoulder', 'Off Shoulder', 'One Shoulder', 'Raglan Sleeves', 'Kimono Sleeves', 'Dolman Sleeves', 'Cape Sleeves', 'Bat Wing Sleeves', 'Drop Shoulder', 'Roll-Up Sleeves', 'Convertible Sleeves',
    // Decorated
    'Slit Sleeves', 'Layered Sleeves', 'Tiered Sleeves', 'Ruffled Sleeves', 'Embroidered Cuff', 'Lace Sleeves'
  ] as const,

  // Length Options (22+ options)
  length: [
    'Hip Length', 'Short (Above Knee)', 'Knee Length', 'Below Knee', 'Mid-Calf', 'Calf Length', 'Midi Length', 'Ankle Length', 'Floor Length', 'Maxi Length',
    'Asymmetric Length', 'High-Low', 'Front Short Back Long', 'Trail Length', 'Cropped',
    '36 inches', '38 inches', '40 inches', '42 inches', '44 inches', '46 inches', '48 inches', '50 inches', '52 inches', '54 inches', '56 inches'
  ] as const,

  // Silhouette Styles (35+ options)
  silhouette: [
    // Classic
    'Straight Cut', 'A-Line', 'Fitted', 'Semi-Fitted', 'Relaxed Fit', 'Loose Fit', 'Flared', 'Box Cut', 'Column', 'Shift',
    // Traditional
    'Anarkali', 'Angrakha', 'Princess Cut', 'Empire Line', 'Peplum', 'Mermaid', 'Umbrella Cut', 'Trumpet', 'Fishtail', 'Ball Gown Style', 'Frock Style',
    // Modern
    'Kaftan Style', 'Shirt Style', 'Tunic Style', 'Jacket Style', 'Overlap Style', 'Wrap Style', 'Layered', 'Cocoon', 'Swing', 'Tent Style', 'Cape Style', 'Poncho Style', 'Kimono Style',
    // Special
    'Asymmetric', 'Side Slit', 'Front Slit', 'Trail Cut', 'Paneled', 'Tiered'
  ] as const,

  // Border Styles (30+ options)
  borderStyle: [
    'No Border', 'Plain Border', 'Contrast Border', 'Matching Border',
    'Embroidered Border', 'Zari Border', 'Gota Border', 'Lace Border', 'Crochet Border',
    'Printed Border', 'Block Print Border', 'Digital Print Border',
    'Scalloped Border', 'Geometric Border', 'Floral Border', 'Paisley Border',
    'Beaded Border', 'Sequin Border', 'Mirror Border', 'Tassel Border', 'Fringe Border',
    // Extended borders
    'Temple Border', 'Wave Border', 'Zigzag Border', 'Check Border', 'Stripe Border', 'Double Border', 'Triple Border',
    'Pearl Border', 'Crystal Border', 'Kundan Border'
  ] as const,

  // Print Techniques (45+ options)
  printTechnique: [
    // Traditional
    'Block Print', 'Hand Block Print', 'Dabu Print', 'Bagru Print', 'Ajrakh Print', 'Sanganeri Print', 'Jaipur Print', 'Bagh Print', 'Balotra Print',
    'Kalamkari', 'Pen Kalamkari', 'Block Kalamkari', 'Madhubani Print', 'Warli Print', 'Pichwai Print',
    // Resist printing
    'Tie-Dye', 'Bandhani', 'Leheriya', 'Shibori', 'Batik', 'Kota Bandhani', 'Jamnagar Bandhani',
    // Modern
    'Digital Print', 'Screen Print', 'Discharge Print', 'Foil Print', 'Flock Print', 'Sublimation Print', 'Heat Transfer Print', 'Rotary Print', 'Roller Print',
    // Patterns
    'Ikat', 'Patola', 'Geometric Print', 'Abstract Print', 'Floral Print', 'Paisley Print', 'Animal Print', 'Tribal Print',
    // Extended patterns
    'Polka Dot Print', 'Stripe Print', 'Check Print', 'Plaid Print', 'Damask Print', 'Baroque Print', 'Art Deco Print', 'Bohemian Print', 'Vintage Print'
  ] as const,

  // Occasion Types (35+ options)
  occasion: [
    'Daily Wear', 'Casual Wear', 'Office Wear', 'Work Wear', 'Formal Wear', 'Semi-Formal', 'Business Casual', 'College Wear', 'Weekend Wear',
    'Festive Wear', 'Diwali Special', 'Eid Special', 'Navratri Special', 'Durga Puja Special', 'Navratri', 'Lohri', 'Haldi', 'Karwa Chauth', 'Baisakhi',
    'Wedding Wear', 'Mehendi Ceremony', 'Sangeet', 'Reception', 'Wedding Guest', 'Bridal Shower', 'Engagement',
    'Party Wear', 'Evening Wear', 'Cocktail Party', 'Date Night',
    'Puja Wear', 'Temple Wear', 'Religious Ceremony', 'Family Gathering', 'Anniversary', 'Birthday Party', 'Graduation', 'Winter Wear'
  ] as const,

  // Embellishments (35+ options)
  embellishments: [
    'Tassels', 'Pom Poms', 'Fabric Buttons', 'Metal Buttons', 'Pearl Buttons', 'Designer Buttons', 'Mirror Buttons', 'Crystal Buttons', 'Shell Buttons', 'Coconut Buttons',
    'Latkans', 'Hangings', 'Fabric Flowers', '3D Flowers',
    'Brooch', 'Buckle', 'Metal Studs', 'Crystal Studs', 'Rhinestones', 'Gems', 'Beads',
    'Piping', 'Bias Tape', 'Cord Detailing', 'Fabric Loops', 'Drawstrings',
    'Sequin Patches', 'Embroidered Patches', 'Applique Motifs', 'Feathers', 'Frills', 'Ruffles', 'Pleats', 'Gathers', 'Smocking'
  ] as const,

  // Back Design (22+ options)
  backDesign: [
    'Plain Back', 'Deep Back', 'Medium Deep Back', 'Shallow Back', 'Boat Back',
    'Keyhole Back', 'V-Back', 'Round Back', 'Square Back',
    'Embroidered Back', 'Printed Back', 'Lace Back', 'Sheer Back',
    'Tie-Up Back', 'Button Back', 'Zipper Back',
    'Cowl Back', 'Drape Back', 'Cutout Back', 'Cage Back', 'Lattice Back', 'Racerback'
  ] as const,

  // Slit Style (18+ options)
  slitStyle: [
    'No Slit', 'Side Slit Small', 'Side Slit Medium', 'Side Slit Deep', 'Side Slit Both Sides',
    'Front Slit', 'Back Slit', 'Front Center Slit',
    'Curved Slit', 'Straight Slit', 'Asymmetric Slit', 'Layered Slit',
    'Button Slit', 'Loop Slit', 'Overlap Slit', 'Double Slit', 'Triple Slit', 'High Slit'
  ] as const,

  // Hemline Style (18+ options)
  hemlineStyle: [
    'Straight Hemline', 'Curved Hemline', 'Asymmetric Hemline', 'High-Low Hemline',
    'Scalloped Hemline', 'Pointed Hemline', 'Rounded Hemline',
    'Handkerchief Hemline', 'Fishtail Hemline', 'Layered Hemline', 'Ruffled Hemline', 'Fringed Hemline',
    'Tulip Hemline', 'Bubble Hemline', 'Waterfall Hemline', 'Draped Hemline', 'Split Hemline', 'Tiered Hemline'
  ] as const,

  // Collar Style (16+ options)
  collarStyle: [
    'No Collar', 'Stand Collar', 'Flat Collar', 'Rolled Collar', 'Shawl Collar',
    'Notched Collar', 'Pointed Collar', 'Rounded Collar', 'Mandarin Collar', 'Ruffle Collar',
    'Cape Collar', 'Sailor Collar', 'Puritan Collar', 'Cowl Collar', 'Funnel Collar', 'Bertha Collar'
  ] as const,

  // Placket Style (15+ options)
  placketStyle: [
    'No Placket', 'Center Placket', 'Side Placket', 'Hidden Placket', 'Contrast Placket',
    'Embroidered Placket', 'Button Placket', 'Loop Placket', 'Zipper Placket', 'Tie-Up Placket',
    'Concealed Placket', 'Overlap Placket', 'Decorative Placket', 'Double Placket', 'Asymmetric Placket'
  ] as const,

  // Panel Design (16+ options)
  panelDesign: [
    'No Panels', 'Side Panels', 'Front Panels', 'Princess Panels', 'Godet Panels',
    'Contrast Panels', 'Embroidered Panels', 'Printed Panels', 'Pleated Panels', 'Layered Panels',
    'Vertical Panels', 'Horizontal Panels', 'Diagonal Panels', 'Center Panel', 'Back Panel', 'Color Block Panels'
  ] as const,

  // Yoke Style (18+ options)
  yokeStyle: [
    'No Yoke', 'Round Yoke', 'Square Yoke', 'V-Yoke', 'Curved Yoke',
    'Embroidered Yoke', 'Printed Yoke', 'Contrast Yoke', 'Pleated Yoke',
    'Smocked Yoke', 'Gathered Yoke', 'Pintuck Yoke',
    'Lace Yoke', 'Sheer Yoke', 'Mirror Work Yoke', 'Sequin Yoke', 'Beaded Yoke', 'Western Yoke'
  ] as const,

  // Cuff Style (16+ options)
  cuffStyle: [
    'No Cuff', 'Plain Cuff', 'Contrast Cuff', 'Embroidered Cuff', 'Buttoned Cuff',
    'Elastic Cuff', 'Ruffle Cuff', 'Lace Cuff', 'Roll-Up Cuff', 'Slit Cuff',
    'French Cuff', 'Barrel Cuff', 'Turnback Cuff', 'Double Cuff', 'Gathered Cuff', 'Bell Cuff'
  ] as const,

  // Pocket Style (16+ options)
  pocketStyle: [
    'No Pockets', 'Side Seam Pockets', 'Patch Pockets', 'Welt Pockets', 'Hidden Pockets',
    'Kangaroo Pocket', 'Decorative Pockets', 'Embroidered Pockets', 'Contrast Pockets', 'Button Pockets',
    'Flap Pockets', 'Inseam Pockets', 'Zippered Pockets', 'Slash Pockets', 'Chest Pocket', 'Hip Pockets'
  ] as const,

  // Closure Type (16+ options)
  closureType: [
    'Pullover (No Closure)', 'Front Button', 'Back Button', 'Side Button',
    'Front Zipper', 'Back Zipper', 'Side Zipper', 'Tie-Up', 'Hook and Eye', 'Snap Buttons',
    'Toggle', 'Frog Closure', 'Lace-Up', 'Drawstring', 'Magnetic Closure', 'Velcro'
  ] as const,

  // Lining Type (14+ options)
  liningType: [
    'Unlined', 'Fully Lined', 'Half Lined', 'Bodice Lined',
    'Cotton Lining', 'Silk Lining', 'Santoon Lining', 'Crepe Lining',
    'Satin Lining', 'Poly Lining', 'Mesh Lining', 'Voile Lining', 'Taffeta Lining', 'Cupro Lining'
  ] as const,

  // Finishing Details (18+ options)
  finishingDetails: [
    'Clean Finished', 'Piping Finish', 'Bias Finish', 'Serged Finish',
    'French Seam', 'Flat Felled Seam', 'Overlocked',
    'Contrast Stitching', 'Topstitching', 'Hand Finished', 'Rolled Hem', 'Blind Hem',
    'Bound Edges', 'Raw Edge', 'Frayed Edge', 'Lettuce Edge', 'Picot Edge', 'Shell Edge'
  ] as const,

  // Motif/Pattern (25+ options)
  motifPattern: [
    'Floral Motif', 'Paisley Motif', 'Geometric Motif', 'Abstract Motif', 'Ethnic Motif',
    'Peacock Motif', 'Elephant Motif', 'Lotus Motif', 'Mango Motif', 'Temple Motif',
    'Mughal Motif', 'Rajasthani Motif', 'South Indian Motif', 'Tribal Motif', 'Minimalist Motif',
    'Mandala Motif', 'Jaali Motif', 'Meenakari Motif', 'Butterfly Motif', 'Bird Motif', 'Tree of Life Motif',
    'Sun Motif', 'Moon Motif', 'Star Motif', 'Heart Motif'
  ] as const,

  // Color Combination (12+ options)
  colorCombination: [
    'Monochrome', 'Complementary Colors', 'Analogous Colors', 'Triadic Colors',
    'Contrasting Colors', 'Pastel Combination', 'Jewel Tones', 'Earth Tones',
    'Neutral Palette', 'Bold and Bright', 'Muted Tones', 'Metallic Accents'
  ] as const,

  // Seasonal Style (8+ options)
  seasonalStyle: [
    'Summer Collection', 'Winter Collection', 'Monsoon Special', 'Spring Collection',
    'All Season', 'Transitional Wear', 'Lightweight Summer', 'Cozy Winter'
  ] as const,

  // Body Type (8+ options)
  bodyType: [
    'All Body Types', 'Petite Friendly', 'Plus Size Friendly', 'Tall Friendly',
    'Hourglass', 'Pear Shape', 'Apple Shape', 'Rectangle Shape'
  ] as const,

  // Age Group (6+ options)
  ageGroup: [
    'All Ages', 'Young Adults (18-25)', 'Adults (26-40)', 'Mature (40+)',
    'Teen Friendly', 'Elegant Mature'
  ] as const,

  // Model Skin Tone Options
  modelSkinTone: [
    'Fair', 'Light', 'Light-Medium', 'Medium', 'Medium-Tan',
    'Tan', 'Olive', 'Brown', 'Dark Brown', 'Deep', 'Ebony',
    'Warm Undertone', 'Cool Undertone', 'Neutral Undertone',
    'Dusky', 'Wheatish', 'Golden'
  ] as const,

  // Model Height Options
  modelHeight: [
    'Petite (5\'0" - 5\'3")', 'Short (5\'3" - 5\'5")', 'Average (5\'5" - 5\'7")',
    'Tall (5\'7" - 5\'9")', 'Very Tall (5\'9"+)'
  ] as const,

  // Model Pose Options
  modelPose: [
    'Standing Front', 'Standing 3/4 View', 'Standing Side Profile',
    'Walking Pose', 'Graceful Pose', 'Traditional Pose',
    'Hands on Waist', 'Casual Relaxed', 'Elegant Stance'
  ] as const,
} as const;

// Total options count: 400+ design factors

export const MARKER_CHANGE_OPTIONS: { value: MarkerChangeType; label: string; icon: string }[] = [
  { value: 'change-color', label: 'Change Color', icon: 'Palette' },
  { value: 'change-design', label: 'Change Design', icon: 'Paintbrush' },
  { value: 'add-embroidery', label: 'Add/Change Embroidery', icon: 'Sparkles' },
  { value: 'change-pattern', label: 'Change Pattern', icon: 'Grid3X3' },
  { value: 'remove-element', label: 'Remove Element', icon: 'Eraser' },
  { value: 'custom', label: 'Custom Note', icon: 'MessageSquare' },
];
