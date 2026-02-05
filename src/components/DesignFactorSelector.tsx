import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DesignFactors, DESIGN_OPTIONS } from '@/types/kurti';
import { DESIGN_OPTIONS_HI } from '@/contexts/LanguageContext';
import { ColorGroupSelector } from '@/components/ColorGroupSelector';
import { GroupedOptionSelector } from '@/components/GroupedOptionSelector';
import { DesignMotifSelector } from '@/components/DesignMotifSelector';
import {
  FABRIC_GROUPS,
  EMBROIDERY_GROUPS,
  PRINT_GROUPS,
  SILHOUETTE_GROUPS,
  NECKLINE_GROUPS,
  SLEEVES_GROUPS,
  ADDITIONAL_TRANSLATIONS_HI,
} from '@/data/designGroups';
import { cn } from '@/lib/utils';
import {
  Palette, Shirt, Sparkles, CircleDot, Ruler, SquareAsterisk, Frame, Printer,
  PartyPopper, ChevronDown, ChevronUp, Gem, ArrowDownUp, Scissors,
  Grid3X3, Layers, PanelTop, CircleDashed, Grip, Lock,
  Rows, CheckSquare, Thermometer, Users, Calendar, Languages, Search, FileText, ImageIcon, Filter, X, Shuffle, Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

// Filter categories definition
const FILTER_CATEGORIES = [
  { id: 'essential', label: 'Essential Options', labelHi: 'मुख्य विकल्प', icon: '✨' },
  { id: 'motifs', label: 'Design Motifs', labelHi: 'डिज़ाइन मोटिफ', icon: '🎨' },
  { id: 'color', label: 'Color & Fabric', labelHi: 'रंग और कपड़ा', icon: '🎨' },
  { id: 'embroidery', label: 'Embroidery & Embellishments', labelHi: 'कढ़ाई और सजावट', icon: '✨' },
  { id: 'prints', label: 'Prints & Patterns', labelHi: 'प्रिंट और पैटर्न', icon: '🖨️' },
  { id: 'silhouette', label: 'Silhouette & Cut', labelHi: 'सिल्हूट और कट', icon: '📐' },
  { id: 'neckline', label: 'Neckline & Collar', labelHi: 'नेकलाइन और कॉलर', icon: '👔' },
  { id: 'sleeves', label: 'Sleeves & Cuffs', labelHi: 'आस्तीन और कफ', icon: '👕' },
  { id: 'construction', label: 'Construction Details', labelHi: 'निर्माण विवरण', icon: '🔧' },
  { id: 'model', label: 'Model Display', labelHi: 'मॉडल प्रदर्शन', icon: '👩' },
  { id: 'occasion', label: 'Occasion & Styling', labelHi: 'अवसर और स्टाइलिंग', icon: '🎉' },
] as const;

type FilterCategoryId = typeof FILTER_CATEGORIES[number]['id'];

interface DesignFactorSelectorProps {
  factors: DesignFactors;
  onFactorsChange: (factors: DesignFactors) => void;
  hindiPrompt: boolean;
  onHindiPromptChange: (value: boolean) => void;
}

interface FactorSectionProps {
  title: string;
  titleHi: string;
  categoryKey: string;
  icon: React.ReactNode;
  options: readonly string[];
  selected: string[];
  onSelect: (values: string[]) => void;
  multiSelect?: boolean;
  defaultOpen?: boolean;
  showHindi: boolean;
  searchQuery?: string;
}

// Merge all Hindi translations
const getAllTranslations = (categoryKey: string): Record<string, string> => {
  return {
    ...(DESIGN_OPTIONS_HI[categoryKey] || {}),
    ...(ADDITIONAL_TRANSLATIONS_HI[categoryKey] || {}),
  };
};

const FactorSection: React.FC<FactorSectionProps> = ({
  title,
  titleHi,
  categoryKey,
  icon,
  options,
  selected,
  onSelect,
  multiSelect = true,
  defaultOpen = false,
  showHindi,
  searchQuery = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const translations = getAllTranslations(categoryKey);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(option => {
      const hindiLabel = translations[option] || '';
      return option.toLowerCase().includes(query) || hindiLabel.includes(query);
    });
  }, [options, searchQuery, translations]);

  // Auto-open if search matches
  const shouldBeOpen = searchQuery && filteredOptions.length > 0 ? true : isOpen;

  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        onSelect(selected.filter((s) => s !== option));
      } else {
        onSelect([...selected, option]);
      }
    } else {
      onSelect(selected.includes(option) ? [] : [option]);
    }
  };

  const getOptionLabel = (option: string) => {
    if (showHindi && translations[option]) {
      return `${option} / ${translations[option]}`;
    }
    return option;
  };

  const clearAll = () => onSelect([]);

  // Hide section if no matches
  if (searchQuery && filteredOptions.length === 0) return null;

  return (
    <Collapsible open={shouldBeOpen} onOpenChange={setIsOpen} className="border rounded-lg bg-card">
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors rounded-lg">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-sm">
              {(showHindi || searchQuery) ? `${title} / ${titleHi}` : title}
            </span>
            <span className="text-xs text-muted-foreground">
              ({searchQuery ? `${filteredOptions.length}/${options.length}` : options.length})
            </span>
            {selected.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selected.length} selected
              </Badge>
            )}
          </div>
          <ChevronDown className={cn("w-4 h-4 transition-transform", shouldBeOpen && "rotate-180")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3 space-y-2">
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6">
              Clear all
            </Button>
          )}
          <div className="flex flex-wrap gap-1.5">
            {filteredOptions.map((option) => (
              <Badge
                key={option}
                variant={selected.includes(option) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all text-xs py-1.5 px-2.5 hover:scale-105",
                  selected.includes(option)
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-primary/10 hover:border-primary"
                )}
                onClick={() => toggleOption(option)}
              >
                {getOptionLabel(option)}
              </Badge>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Quick Presets with predefined factor combinations
const QUICK_PRESETS = [
  {
    id: 'wedding-traditional',
    label: 'Wedding Traditional',
    labelHi: 'शादी पारंपरिक',
    factors: {
      color: ['Ruby Red', 'Golden Yellow', 'Dark Maroon'],
      fabric: ['Banarasi Silk', 'Velvet'],
      embroidery: ['Zardozi', 'Gota Patti', 'Kundan Work', 'Stone Work'],
      silhouette: ['Anarkali', 'Flared'],
      occasion: ['Wedding Wear', 'Reception'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Sweetheart', 'Deep V-Neck'],
      sleeves: ['3/4 Sleeves', 'Full Sleeves'],
      borderStyle: ['Zari Border', 'Embroidered Border'],
      embellishments: ['Tassels', 'Latkans'],
      backDesign: ['Deep Back', 'Embroidered Back'],
      hemlineStyle: ['Scalloped Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Hand Finished', 'Piping Finish'],
    },
  },
  {
    id: 'modern-office',
    label: 'Modern Office',
    labelHi: 'आधुनिक ऑफिस',
    factors: {
      color: ['Dark Navy', 'Beige', 'Charcoal', 'Cream', 'Slate Grey'],
      fabric: ['Cotton Linen', 'Crepe', 'Cambric', 'Poly Cotton'],
      silhouette: ['Straight Cut', 'A-Line', 'Shift'],
      occasion: ['Office Wear', 'Work Wear', 'Business Casual'],
      length: ['Knee Length', 'Below Knee'],
      sleeves: ['3/4 Sleeves', 'Elbow Length', 'Roll-Up Sleeves'],
      neckline: ['Mandarin Collar', 'Band Collar', 'Shirt Collar'],
      placketStyle: ['Center Placket', 'Button Placket'],
      pocketStyle: ['Side Seam Pockets', 'Welt Pockets'],
      closureType: ['Front Button', 'Hidden Placket'],
      hemlineStyle: ['Straight Hemline', 'Curved Hemline'],
      finishingDetails: ['Clean Finished', 'Topstitching'],
      liningType: ['Unlined', 'Bodice Lined'],
    },
  },
  {
    id: 'festive-glam',
    label: 'Festive Glam',
    labelHi: 'उत्सव ग्लैम',
    factors: {
      color: ['Emerald Green', 'Rose Gold', 'Champagne Gold', 'Burgundy'],
      fabric: ['Chanderi Silk', 'Art Silk', 'Georgette', 'Brocade'],
      embroidery: ['Mirror Work', 'Sequin Work', 'Zari Work', 'Crystal Work'],
      silhouette: ['A-Line', 'Anarkali', 'Flared'],
      occasion: ['Festive Wear', 'Party Wear', 'Evening Wear'],
      embellishments: ['Tassels', '3D Flowers', 'Brooch', 'Latkans'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Deep V-Neck', 'Sweetheart', 'Keyhole'],
      sleeves: ['Bell Sleeves', 'Flutter Sleeves', 'Cold Shoulder'],
      borderStyle: ['Sequin Border', 'Zari Border', 'Mirror Border'],
      backDesign: ['Deep Back', 'Keyhole Back'],
      hemlineStyle: ['Scalloped Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke', 'Sequin Yoke'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'casual-boho',
    label: 'Casual Boho',
    labelHi: 'कैजुअल बोहो',
    factors: {
      color: ['Mustard', 'Cream', 'Burnt Orange', 'Olive Green', 'Terracotta'],
      fabric: ['Pure Cotton', 'Handloom Cotton', 'Khadi Cotton', 'Linen Blend'],
      printTechnique: ['Block Print', 'Hand Block Print', 'Tie-Dye', 'Bohemian Print'],
      silhouette: ['Kaftan Style', 'Relaxed Fit', 'Loose Fit', 'Swing'],
      occasion: ['Casual Wear', 'Daily Wear', 'Weekend Wear'],
      length: ['Knee Length', 'Midi Length'],
      neckline: ['Round Neck', 'V-Neck', 'Boat Neck'],
      sleeves: ['Short Sleeves', 'Flutter Sleeves', 'Peasant Sleeves'],
      embellishments: ['Tassels', 'Pom Poms', 'Fabric Buttons'],
      pocketStyle: ['Side Seam Pockets', 'Patch Pockets'],
      borderStyle: ['Printed Border', 'Block Print Border'],
      hemlineStyle: ['Curved Hemline', 'Asymmetric Hemline'],
      finishingDetails: ['Raw Edge', 'Frayed Edge'],
    },
  },
  {
    id: 'sangeet-night',
    label: 'Sangeet Night',
    labelHi: 'संगीत नाइट',
    factors: {
      color: ['Bright Pink', 'Bright Purple', 'Fuchsia', 'Hot Pink', 'Magenta'],
      fabric: ['Georgette', 'Chiffon', 'Satin Georgette', 'Net'],
      embroidery: ['Sequin Work', 'Resham Work', 'Mirror Work', 'Crystal Work', 'Bead Work'],
      silhouette: ['Flared', 'A-Line', 'Layered', 'Anarkali'],
      occasion: ['Sangeet', 'Party Wear', 'Evening Wear', 'Cocktail Party'],
      sleeves: ['Cold Shoulder', 'Off Shoulder', 'Cape Sleeves', 'Flutter Sleeves'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Deep V-Neck', 'Sweetheart', 'Halter', 'One Shoulder Neck'],
      borderStyle: ['Sequin Border', 'Mirror Border', 'Beaded Border'],
      embellishments: ['Tassels', '3D Flowers', 'Rhinestones', 'Latkans'],
      backDesign: ['Deep Back', 'Tie-Up Back', 'Keyhole Back'],
      hemlineStyle: ['Layered Hemline', 'Ruffled Hemline', 'Waterfall Hemline'],
      yokeStyle: ['Sequin Yoke', 'Beaded Yoke'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'summer-daily',
    label: 'Summer Daily',
    labelHi: 'गर्मी दैनिक',
    factors: {
      color: ['Pastel Blue', 'Pastel Green', 'Pastel Pink', 'Pastel Yellow', 'Pastel Mint', 'Sky Blue'],
      fabric: ['Organic Cotton', 'Pure Cotton', 'Voile Cotton', 'Cotton Cambric', 'Linen Cotton'],
      silhouette: ['Relaxed Fit', 'A-Line', 'Shift', 'Straight Cut'],
      occasion: ['Daily Wear', 'Casual Wear', 'Weekend Wear', 'College Wear'],
      length: ['Short (Above Knee)', 'Knee Length', 'Hip Length'],
      sleeves: ['Short Sleeves', 'Cap Sleeves', 'Sleeveless', 'Flutter Sleeves'],
      neckline: ['Round Neck', 'V-Neck', 'Scoop Neck', 'Boat Neck'],
      printTechnique: ['Floral Print', 'Polka Dot Print', 'Stripe Print'],
      pocketStyle: ['Side Seam Pockets', 'Patch Pockets'],
      hemlineStyle: ['Curved Hemline', 'Straight Hemline'],
      closureType: ['Pullover (No Closure)', 'Front Button'],
      liningType: ['Unlined'],
      finishingDetails: ['Clean Finished', 'Overlocked'],
    },
  },
  {
    id: 'diwali-special',
    label: 'Diwali Special',
    labelHi: 'दिवाली स्पेशल',
    factors: {
      color: ['Dark Maroon', 'Golden Yellow', 'Burgundy', 'Antique Gold', 'Ruby Red'],
      fabric: ['Art Silk', 'Banarasi Silk', 'Brocade', 'Chanderi Silk'],
      embroidery: ['Zari Work', 'Stone Work', 'Kundan Work', 'Gota Patti', 'Sequin Work'],
      silhouette: ['Anarkali', 'Flared', 'A-Line', 'Princess Cut'],
      occasion: ['Diwali Special', 'Festive Wear', 'Puja Wear'],
      borderStyle: ['Zari Border', 'Gota Border', 'Embroidered Border'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Sweetheart', 'Deep V-Neck', 'Round Neck'],
      sleeves: ['3/4 Sleeves', 'Full Sleeves', 'Bell Sleeves'],
      embellishments: ['Tassels', 'Latkans', '3D Flowers'],
      backDesign: ['Embroidered Back', 'Deep Back'],
      hemlineStyle: ['Scalloped Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke', 'Contrast Yoke'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Hand Finished', 'Piping Finish'],
    },
  },
  {
    id: 'indo-western',
    label: 'Indo-Western',
    labelHi: 'इंडो-वेस्टर्न',
    factors: {
      color: ['Black', 'Silver Grey', 'Charcoal', 'Champagne', 'Platinum'],
      fabric: ['Crepe', 'Satin Crepe', 'Georgette', 'French Crepe', 'Lycra Blend'],
      silhouette: ['Jacket Style', 'Asymmetric', 'Layered', 'Cape Style', 'Overlap Style'],
      occasion: ['Party Wear', 'Cocktail Party', 'Evening Wear', 'Date Night'],
      length: ['High-Low', 'Asymmetric Length', 'Midi Length'],
      neckline: ['V-Neck', 'Deep V-Neck', 'Asymmetric Neck', 'Halter'],
      sleeves: ['Cold Shoulder', 'Cape Sleeves', 'One Shoulder', 'Slit Sleeves'],
      embroidery: ['Cutwork', 'Laser Cut', 'Sequin Work'],
      embellishments: ['Metal Studs', 'Crystal Studs', 'Buckle'],
      backDesign: ['Cutout Back', 'Keyhole Back', 'Deep Back'],
      hemlineStyle: ['High-Low Hemline', 'Asymmetric Hemline'],
      closureType: ['Back Zipper', 'Side Zipper'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Clean Finished', 'Contrast Stitching'],
    },
  },
  {
    id: 'mehendi-ceremony',
    label: 'Mehendi Ceremony',
    labelHi: 'मेहंदी समारोह',
    factors: {
      color: ['Bright Green', 'Bright Yellow', 'Parrot Green', 'Lime Green', 'Lemon Yellow'],
      fabric: ['Chanderi Silk', 'Art Silk', 'Organza', 'Chiffon'],
      embroidery: ['Mirror Work', 'Gota Patti', 'Sequin Work', 'Thread Work', 'Kutchi Work'],
      silhouette: ['Flared', 'A-Line', 'Anarkali', 'Tiered'],
      occasion: ['Mehendi Ceremony', 'Festive Wear', 'Family Gathering'],
      embellishments: ['Pom Poms', 'Tassels', 'Latkans', 'Mirror Buttons', 'Fabric Flowers'],
      borderStyle: ['Gota Border', 'Mirror Border', 'Printed Border'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Round Neck', 'V-Neck', 'Sweetheart'],
      sleeves: ['3/4 Sleeves', 'Flutter Sleeves', 'Bell Sleeves'],
      backDesign: ['Deep Back', 'Tie-Up Back'],
      hemlineStyle: ['Layered Hemline', 'Ruffled Hemline'],
      yokeStyle: ['Mirror Work Yoke', 'Embroidered Yoke'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'puja-wear',
    label: 'Puja Wear',
    labelHi: 'पूजा वियर',
    factors: {
      color: ['Bright Orange', 'Bright Red', 'Saffron', 'Vermillion', 'Marigold', 'Turmeric Yellow'],
      fabric: ['Khadi Silk', 'Chanderi Silk', 'Cotton Silk', 'Art Silk', 'Handwoven Fabric'],
      embroidery: ['Zari Work', 'Thread Work', 'Resham Work', 'Gota Patti'],
      silhouette: ['A-Line', 'Straight Cut', 'Anarkali'],
      occasion: ['Religious Ceremony', 'Temple Wear', 'Puja Wear', 'Family Gathering'],
      borderStyle: ['Zari Border', 'Embroidered Border', 'Gota Border'],
      length: ['Ankle Length', 'Below Knee'],
      neckline: ['Round Neck', 'Mandarin Collar', 'V-Neck'],
      sleeves: ['3/4 Sleeves', 'Full Sleeves', 'Elbow Length'],
      embellishments: ['Tassels', 'Fabric Buttons'],
      hemlineStyle: ['Scalloped Hemline', 'Curved Hemline'],
      yokeStyle: ['Embroidered Yoke'],
      liningType: ['Bodice Lined'],
      finishingDetails: ['Hand Finished'],
    },
  },
  {
    id: 'college-casual',
    label: 'College Casual',
    labelHi: 'कॉलेज कैजुअल',
    factors: {
      color: ['Denim Blue', 'White', 'Pastel Pink', 'Sky Blue', 'Coral', 'Mustard'],
      fabric: ['Pure Cotton', 'Denim', 'Cotton Cambric', 'Poly Cotton', 'Rayon'],
      printTechnique: ['Tie-Dye', 'Stripe Print', 'Check Print', 'Polka Dot Print', 'Abstract Print'],
      silhouette: ['Straight Cut', 'A-Line', 'Shirt Style', 'Tunic Style'],
      occasion: ['College Wear', 'Casual Wear', 'Daily Wear', 'Weekend Wear'],
      length: ['Knee Length', 'Short (Above Knee)', 'Hip Length'],
      sleeves: ['Roll-Up Sleeves', 'Short Sleeves', '3/4 Sleeves', 'Cap Sleeves'],
      neckline: ['Shirt Collar', 'Round Neck', 'V-Neck', 'Band Collar'],
      pocketStyle: ['Patch Pockets', 'Side Seam Pockets'],
      closureType: ['Front Button', 'Pullover (No Closure)'],
      hemlineStyle: ['Curved Hemline', 'Straight Hemline'],
      finishingDetails: ['Clean Finished', 'Topstitching'],
      liningType: ['Unlined'],
    },
  },
  {
    id: 'haldi-ceremony',
    label: 'Haldi Ceremony',
    labelHi: 'हल्दी समारोह',
    factors: {
      color: ['Bright Yellow', 'Turmeric Yellow', 'Lemon Yellow', 'Marigold', 'Honey Gold', 'Mustard'],
      fabric: ['Organza', 'Chanderi Silk', 'Chiffon', 'Art Silk', 'Cotton Silk'],
      embroidery: ['Thread Work', 'Mirror Work', 'Gota Patti', 'Sequin Work', 'Resham Work'],
      silhouette: ['Flared', 'A-Line', 'Anarkali', 'Tiered'],
      occasion: ['Haldi', 'Festive Wear', 'Wedding Guest'],
      embellishments: ['Tassels', 'Pom Poms', 'Latkans', 'Fabric Flowers', 'Mirror Buttons'],
      borderStyle: ['Printed Border', 'Gota Border', 'Mirror Border'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['V-Neck', 'Round Neck', 'Sweetheart'],
      sleeves: ['3/4 Sleeves', 'Flutter Sleeves', 'Bell Sleeves', 'Ruffled Sleeves'],
      backDesign: ['Deep Back', 'Tie-Up Back'],
      hemlineStyle: ['Layered Hemline', 'Ruffled Hemline'],
      yokeStyle: ['Mirror Work Yoke', 'Embroidered Yoke'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'reception-elegant',
    label: 'Reception Elegant',
    labelHi: 'रिसेप्शन एलिगेंट',
    factors: {
      color: ['Wine Red', 'Champagne Gold', 'Burgundy', 'Antique Gold', 'Deep Plum'],
      fabric: ['Velvet', 'Satin', 'Brocade', 'Tissue', 'Heavy Georgette'],
      embroidery: ['Zardozi', 'Stone Work', 'Kundan Work', 'Crystal Work', 'Dabka'],
      silhouette: ['Mermaid', 'Fishtail', 'Trumpet', 'Ball Gown Style'],
      occasion: ['Reception', 'Wedding Wear', 'Evening Wear'],
      length: ['Floor Length', 'Trail Length'],
      neckline: ['Sweetheart', 'Deep V-Neck', 'Illusion Neck', 'Off Shoulder'],
      sleeves: ['Full Sleeves', 'Sheer Sleeves', 'Cap Sleeves', 'Cold Shoulder'],
      borderStyle: ['Zari Border', 'Kundan Border', 'Crystal Border'],
      embellishments: ['3D Flowers', 'Brooch', 'Crystal Studs', 'Tassels'],
      backDesign: ['Deep Back', 'Sheer Back', 'Lace Back', 'Embroidered Back'],
      hemlineStyle: ['Fishtail Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke', 'Beaded Yoke'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Hand Finished', 'Piping Finish'],
    },
  },
  {
    id: 'karwa-chauth',
    label: 'Karwa Chauth',
    labelHi: 'करवा चौथ',
    factors: {
      color: ['Dark Red', 'Golden Yellow', 'Ruby Red', 'Dark Maroon', 'Vermillion'],
      fabric: ['Banarasi Silk', 'Chanderi Silk', 'Art Silk', 'Brocade'],
      embroidery: ['Zari Work', 'Kundan Work', 'Gota Patti', 'Stone Work', 'Dabka'],
      silhouette: ['Anarkali', 'Flared', 'A-Line', 'Princess Cut'],
      occasion: ['Karwa Chauth', 'Festive Wear', 'Religious Ceremony'],
      borderStyle: ['Zari Border', 'Gota Border', 'Embroidered Border'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Sweetheart', 'V-Neck', 'Round Neck'],
      sleeves: ['Full Sleeves', '3/4 Sleeves', 'Bell Sleeves'],
      embellishments: ['Tassels', 'Latkans', '3D Flowers'],
      backDesign: ['Embroidered Back', 'Deep Back'],
      hemlineStyle: ['Scalloped Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke', 'Contrast Yoke'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Hand Finished'],
    },
  },
  {
    id: 'monsoon-style',
    label: 'Monsoon Style',
    labelHi: 'मानसून स्टाइल',
    factors: {
      color: ['Teal Blue', 'Peacock Blue', 'Sea Green', 'Indigo', 'Turquoise', 'Aqua Blue'],
      fabric: ['Synthetic Blend', 'Poly Cotton', 'Rayon', 'Terry Rayon', 'Stretch Cotton'],
      printTechnique: ['Abstract Print', 'Geometric Print', 'Floral Print', 'Digital Print'],
      silhouette: ['A-Line', 'Straight Cut', 'Relaxed Fit', 'Shift'],
      occasion: ['Casual Wear', 'Daily Wear', 'Weekend Wear'],
      length: ['Midi Length', 'Knee Length', 'Below Knee'],
      sleeves: ['Short Sleeves', '3/4 Sleeves', 'Roll-Up Sleeves', 'Elbow Length'],
      neckline: ['Round Neck', 'V-Neck', 'Boat Neck'],
      pocketStyle: ['Side Seam Pockets', 'Hidden Pockets'],
      hemlineStyle: ['Curved Hemline', 'Asymmetric Hemline'],
      closureType: ['Pullover (No Closure)', 'Front Button'],
      finishingDetails: ['Clean Finished', 'Overlocked'],
      liningType: ['Unlined'],
    },
  },
  {
    id: 'winter-festive',
    label: 'Winter Festive',
    labelHi: 'विंटर फेस्टिव',
    factors: {
      color: ['Dark Maroon', 'Aubergine', 'Burgundy', 'Dark Green', 'Plum', 'Wine Purple'],
      fabric: ['Velvet', 'Pashmina', 'Wool Blend', 'Corduroy', 'Tweed'],
      embroidery: ['Kashmiri Embroidery', 'Zari Work', 'Thread Work', 'Aari', 'Resham Work'],
      silhouette: ['Straight Cut', 'A-Line', 'Jacket Style', 'Layered'],
      occasion: ['Winter Wear', 'Festive Wear', 'Family Gathering'],
      sleeves: ['Full Sleeves', '3/4 Sleeves', 'Bishop Sleeves'],
      length: ['Ankle Length', 'Below Knee'],
      neckline: ['High Neck', 'Turtle Neck', 'Mandarin Collar', 'Cowl Neck'],
      borderStyle: ['Embroidered Border', 'Contrast Border'],
      embellishments: ['Fabric Buttons', 'Cord Detailing'],
      backDesign: ['Plain Back', 'Button Back'],
      hemlineStyle: ['Curved Hemline', 'Straight Hemline'],
      yokeStyle: ['Embroidered Yoke'],
      liningType: ['Fully Lined', 'Cotton Lining'],
      finishingDetails: ['Hand Finished', 'Piping Finish'],
    },
  },
  {
    id: 'navratri-dandiya',
    label: 'Navratri Dandiya',
    labelHi: 'नवरात्रि डांडिया',
    factors: {
      color: ['Bright Orange', 'Bright Pink', 'Bright Green', 'Bright Yellow', 'Bright Red', 'Multi-color'],
      fabric: ['Bandhani Fabric', 'Chanderi Silk', 'Art Silk', 'Georgette', 'Chiffon'],
      embroidery: ['Mirror Work', 'Kutchi Work', 'Rabari Embroidery', 'Gota Patti', 'Sequin Work'],
      silhouette: ['Flared', 'A-Line', 'Umbrella Cut', 'Tiered'],
      occasion: ['Navratri', 'Festive Wear', 'Party Wear'],
      embellishments: ['Mirror Buttons', 'Tassels', 'Pom Poms', 'Latkans', 'Coin Work'],
      borderStyle: ['Mirror Border', 'Gota Border', 'Printed Border'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Round Neck', 'V-Neck', 'Sweetheart'],
      sleeves: ['3/4 Sleeves', 'Bell Sleeves', 'Flutter Sleeves'],
      backDesign: ['Deep Back', 'Tie-Up Back'],
      hemlineStyle: ['Layered Hemline', 'Ruffled Hemline', 'Tiered Hemline'],
      yokeStyle: ['Mirror Work Yoke', 'Embroidered Yoke'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'lohri-celebration',
    label: 'Lohri Celebration',
    labelHi: 'लोहड़ी सेलिब्रेशन',
    factors: {
      color: ['Bright Orange', 'Bright Yellow', 'Bright Pink', 'Saffron', 'Hot Pink'],
      fabric: ['Phulkari Fabric', 'Cotton Silk', 'Chanderi Silk', 'Art Silk'],
      embroidery: ['Phulkari', 'Thread Work', 'Mirror Work', 'Gota Patti'],
      silhouette: ['A-Line', 'Flared', 'Straight Cut'],
      occasion: ['Lohri', 'Festive Wear', 'Baisakhi', 'Family Gathering'],
      borderStyle: ['Printed Border', 'Embroidered Border', 'Gota Border'],
      length: ['Knee Length', 'Ankle Length'],
      neckline: ['Round Neck', 'V-Neck', 'Mandarin Collar'],
      sleeves: ['Full Sleeves', '3/4 Sleeves', 'Elbow Length'],
      embellishments: ['Tassels', 'Pom Poms', 'Fabric Buttons'],
      hemlineStyle: ['Curved Hemline', 'Scalloped Hemline'],
      yokeStyle: ['Embroidered Yoke'],
      liningType: ['Bodice Lined'],
      finishingDetails: ['Hand Finished'],
    },
  },
  {
    id: 'eid-special',
    label: 'Eid Special',
    labelHi: 'ईद स्पेशल',
    factors: {
      color: ['Mint Green', 'Powder Blue', 'Pastel Pink', 'Off-White', 'Ivory', 'Champagne'],
      fabric: ['Chiffon', 'Georgette', 'Organza', 'Net', 'Crepe de Chine'],
      embroidery: ['Chikankari', 'Pearl Work', 'Lucknowi Chikan', 'Resham Work', 'Mukaish Work'],
      silhouette: ['Anarkali', 'A-Line', 'Flared', 'Straight Cut'],
      occasion: ['Eid Special', 'Festive Wear', 'Family Gathering'],
      length: ['Ankle Length', 'Floor Length'],
      neckline: ['Round Neck', 'V-Neck', 'Mandarin Collar', 'Band Collar'],
      sleeves: ['Full Sleeves', '3/4 Sleeves', 'Bell Sleeves'],
      borderStyle: ['Lace Border', 'Embroidered Border', 'Pearl Border'],
      embellishments: ['Tassels', 'Pearl Buttons', '3D Flowers'],
      backDesign: ['Plain Back', 'Embroidered Back'],
      hemlineStyle: ['Scalloped Hemline', 'Layered Hemline'],
      yokeStyle: ['Embroidered Yoke', 'Lace Yoke'],
      liningType: ['Fully Lined'],
      finishingDetails: ['Hand Finished', 'Piping Finish'],
    },
  },
  {
    id: 'punjab-phulkari',
    label: 'Punjab (Phulkari)',
    labelHi: 'पंजाब (फुल्कारी)',
    factors: {
      color: ['Deep Pink', 'Bright Orange', 'Yellow', 'Royal Blue', 'Red'],
      fabric: ['Cotton', 'Khadi', 'Chanderi'],
      embroidery: ['Phulkari', 'Thread Work', 'Mirror Work'],
      silhouette: ['Straight Cut', 'Short Kurti', 'Patiala Style'],
      occasion: ['Festive Wear', 'Daily Wear', 'Wedding Guest'],
      sleeves: ['Full Sleeves', '3/4 Sleeves'],
      neckline: ['Round Neck', 'V-Neck'],
      embellishments: ['Tassels', 'Parandi', 'Pom Poms'],
      borderStyle: ['Embroidered Border', 'Thread Work Border'],
      hemlineStyle: ['Straight Hemline', 'Curved Hemline'],
      yokeStyle: ['Embroidered Yoke'],
      liningType: ['Cotton Lining'],
    },
  },
  {
    id: 'gujarat-navratri',
    label: 'Gujarat (Kutch/Navratri)',
    labelHi: 'गुजरात (कच्छ/नवरात्रि)',
    factors: {
      color: ['Multi-color', 'Bright Red', 'Black', 'Yellow', 'Orange', 'Green'],
      fabric: ['Bandhani Fabric', 'Cotton', 'Gajji Silk'],
      embroidery: ['Mirror Work', 'Kutchi Work', 'Rabari Embroidery', 'Ahir Work'],
      silhouette: ['Flared', 'Angrakha', 'A-Line', 'Kedia Style'],
      occasion: ['Navratri', 'Festive Wear', 'Cultural Event'],
      printTechnique: ['Bandhani', 'Tie-Dye', 'Ajrakh'],
      sleeves: ['Bell Sleeves', '3/4 Sleeves', 'Short Sleeves'],
      neckline: ['V-Neck', 'Round Neck', 'Angrakha Neck'],
      embellishments: ['Mirror Buttons', 'Coins', 'Cowrie Shells', 'Tassels', 'Pom Poms'],
      borderStyle: ['Mirror Border', 'Embroidered Border'],
      hemlineStyle: ['Flared Hemline', 'Layered Hemline'],
      yokeStyle: ['Mirror Work Yoke', 'Patchwork Yoke'],
    },
  },
  {
    id: 'bengal-kantha',
    label: 'Bengal (Kantha)',
    labelHi: 'बंगाल (कांथा)',
    factors: {
      color: ['White', 'Red', 'Cream', 'Beige', 'Mustard Yellow'],
      fabric: ['Tussar Silk', 'Cotton', 'Khadi', 'Handloom Cotton'],
      embroidery: ['Kantha Stitch', 'Running Stitch', 'Hand Embroidery'],
      silhouette: ['Straight Cut', 'A-Line', 'Relaxed Fit'],
      occasion: ['Durga Puja', 'Cultural Event', 'Office Wear', 'Daily Wear'],
      sleeves: ['3/4 Sleeves', 'Puff Sleeves', 'Bell Sleeves'],
      neckline: ['Boat Neck', 'Round Neck', 'Scoop Neck'],
      printTechnique: ['Batik Print', 'Hand Block Print'],
      borderStyle: ['Kantha Border', 'Contrast Border'],
      hemlineStyle: ['Straight Hemline'],
      embellishments: ['Fabric Buttons'],
      finishingDetails: ['Hand Finished'],
    },
  },
  {
    id: 'south-india-temple',
    label: 'South India (Temple)',
    labelHi: 'दक्षिण भारत (टेंपल)',
    factors: {
      color: ['Deep Green', 'Maroon', 'Mustard', 'Royal Blue', 'Purple', 'Gold'],
      fabric: ['Kanjivaram Silk', 'Raw Silk', 'Cotton Silk', 'Silk Blend'],
      embroidery: ['Zari Work', 'Gold Thread Work', 'Kasuti'],
      silhouette: ['Anarkali', 'Straight Cut', 'A-Line', 'Pleated'],
      occasion: ['Wedding Guest', 'Festive Wear', 'Temple Wear'],
      sleeves: ['Elbow Length', 'Cap Sleeves', 'Puff Sleeves'],
      neckline: ['Round Neck', 'Square Neck', 'Boat Neck'],
      borderStyle: ['Zari Border', 'Temple Border', 'Woven Border'],
      printTechnique: ['Kalamkari', 'Gold Print'],
      embellishments: ['Gold Beads', 'Temple Jewelry Motifs'],
      backDesign: ['Deep Back', 'Potli Button Back'],
      hemlineStyle: ['Straight Hemline', 'Border Hemline'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'rajasthan-leheriya',
    label: 'Rajasthan (Leheriya/Gota)',
    labelHi: 'राजस्थान (लहरिया/गोटा)',
    factors: {
      color: ['Bright Pink', 'Orange', 'Yellow', 'Red', 'Turquoise', 'Multi-color'],
      fabric: ['Kota Doria', 'Georgette', 'Chiffon', 'Cotton'],
      embroidery: ['Gota Patti', 'Zardozi', 'Exam Work'],
      printTechnique: ['Leheriya', 'Bandhani', 'Bagru Print', 'Dabu Print'],
      silhouette: ['Angrakha', 'Anarkali', 'Flared', 'A-Line'],
      occasion: ['Teej', 'Gangaur', 'Festive Wear', 'Wedding Guest'],
      sleeves: ['3/4 Sleeves', 'Bell Sleeves', 'Churidar Sleeves'],
      neckline: ['Angrakha Neck', 'V-Neck', 'Round Neck'],
      borderStyle: ['Gota Border', 'Lace Border'],
      embellishments: ['Latkans', 'Gota Flowers', 'Tassels'],
      yokeStyle: ['Angrakha Yoke', 'Gota Yoke'],
      hemlineStyle: ['Flared Hemline'],
      liningType: ['Fully Lined'],
    },
  },
  {
    id: 'lucknow-chikankari',
    label: 'Lucknow (Chikankari)',
    labelHi: 'लखनऊ (चिकनकारी)',
    factors: {
      color: ['White', 'Pastel Pink', 'Powder Blue', 'Lemon Yellow', 'Peach', 'Mint Green'],
      fabric: ['Georgette', 'Cotton', 'Muslin', 'Chiffon', 'Organza'],
      embroidery: ['Chikankari', 'Shadow Work', 'Mukaish Work', 'Jali Work'],
      silhouette: ['Straight Cut', 'Anarkali', 'A-Line'],
      occasion: ['Summer Wear', 'Casual Wear', 'Day Event'],
      sleeves: ['Full Sleeves', '3/4 Sleeves', 'Bell Sleeves'],
      neckline: ['Round Neck', 'V-Neck', 'Keyhole'],
      embellishments: ['Pearls', 'Sequins (Mukaish)'],
      borderStyle: ['Chikan Border'],
      hemlineStyle: ['Straight Hemline', 'Scalloped Hemline'],
      liningType: ['Cotton Lining', 'Separate Inner'],
    },
  },
  {
    id: 'kashmir-aari',
    label: 'Kashmir (Aari/Pheran)',
    labelHi: 'कश्मीर (आरी/फेरन)',
    factors: {
      color: ['Deep Blue', 'Burgundy', 'Black', 'Wine', 'Rust', 'Cream'],
      fabric: ['Wool', 'Pashmina', 'Velvet', 'Silk Blend'],
      embroidery: ['Aari Work', 'Kashmiri Embroidery', 'Crewel Work', 'Sozni'],
      silhouette: ['Loose Fit', 'Pheran Style', 'Straight Cut', 'Kaftan Style'],
      occasion: ['Winter Wear', 'Casual Wear', 'Evening Wear'],
      sleeves: ['Full Sleeves', 'Bell Sleeves', 'Wide Sleeves'],
      neckline: ['High Neck', 'Round Neck', 'Split Neck'],
      printTechnique: ['Paisley Print', 'Floral Print'],
      borderStyle: ['Embroidered Border'],
      embellishments: ['Cord Detailing'],
      pocketStyle: ['Side Seam Pockets'],
      hemlineStyle: ['Straight Hemline'],
      liningType: ['Fully Lined'],
      seasonalStyle: ['Winter'],
    },
  },
  {
    id: 'maharashtra-paithani',
    label: 'Maharashtra (Paithani)',
    labelHi: 'महाराष्ट्र (पैठणी)',
    factors: {
      color: ['Peacock Blue', 'Magenta', 'Purple', 'Parrot Green', 'Gold', 'Orange'],
      fabric: ['Paithani Silk', 'Khan Fabric', 'Silk Blend', 'Cotton Silk'],
      embroidery: ['Zari Work', 'Thread Work'],
      printTechnique: ['Peacock Motif', 'Traditional Weave'],
      silhouette: ['Straight Cut', 'A-Line', 'Anarkali'],
      occasion: ['Ganesh Chaturthi', 'Wedding Guest', 'Cultural Event'],
      sleeves: ['Elbow Length', '3/4 Sleeves', 'Cap Sleeves'],
      neckline: ['Round Neck', 'Square Neck'],
      borderStyle: ['Zari Border', 'Peacock Border', 'Woven Border'],
      embellishments: ['Nath Motif', 'Gold Beads'],
      backDesign: ['Deep Back', 'Patchwork Back'],
      hemlineStyle: ['Border Hemline', 'Straight Hemline'],
      yokeStyle: ['Patchwork Yoke', 'Contrast Yoke'],
      liningType: ['Fully Lined'],
    },
  },
] as const;

export const DesignFactorSelector: React.FC<DesignFactorSelectorProps> = ({
  factors,
  onFactorsChange,
  hindiPrompt,
  onHindiPromptChange,
}) => {
  const [showHindi, setShowHindi] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterCategoryId[]>([]);
  const [showAllPresets, setShowAllPresets] = useState(false);

  const INITIAL_PRESETS_COUNT = 6;

  const toggleFilter = (filterId: FilterCategoryId) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const isFilterActive = (filterId: FilterCategoryId) =>
    activeFilters.length === 0 || activeFilters.includes(filterId);

  const updateFactor = <K extends keyof DesignFactors>(
    key: K,
    value: DesignFactors[K]
  ) => {
    onFactorsChange({ ...factors, [key]: value });
  };

  // Apply a preset
  const applyPreset = (presetFactors: Partial<Record<keyof DesignFactors, readonly string[]>>) => {
    const newFactors = { ...factors };
    Object.entries(presetFactors).forEach(([key, values]) => {
      if (values) {
        (newFactors as any)[key] = [...values];
      }
    });
    onFactorsChange(newFactors);
  };

  // Randomize selections - selects more factors for comprehensive designs
  const randomizeFactors = () => {
    const getRandomItems = <T,>(arr: readonly T[], count: number): T[] => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    const newFactors: DesignFactors = {
      ...factors,
      // Always select these core factors
      color: getRandomItems(DESIGN_OPTIONS.color, Math.floor(Math.random() * 2) + 2), // 2-3 colors
      fabric: getRandomItems(DESIGN_OPTIONS.fabric, 1),
      silhouette: getRandomItems(DESIGN_OPTIONS.silhouette, 1),
      occasion: getRandomItems(DESIGN_OPTIONS.occasion, 1),
      length: getRandomItems(DESIGN_OPTIONS.length, 1),
      neckline: getRandomItems(DESIGN_OPTIONS.neckline, 1),
      sleeves: getRandomItems(DESIGN_OPTIONS.sleeves, 1),

      // High probability factors (70-80%)
      embroidery: Math.random() > 0.2 ? getRandomItems(DESIGN_OPTIONS.embroidery.filter(e => e !== 'None'), Math.floor(Math.random() * 2) + 1) : [],
      borderStyle: Math.random() > 0.3 ? getRandomItems(DESIGN_OPTIONS.borderStyle, 1) : [],

      // Medium probability factors (50-60%)
      printTechnique: Math.random() > 0.4 ? getRandomItems(DESIGN_OPTIONS.printTechnique, 1) : [],
      embellishments: Math.random() > 0.4 ? getRandomItems(DESIGN_OPTIONS.embellishments, Math.floor(Math.random() * 2) + 1) : [],
      hemlineStyle: Math.random() > 0.5 ? getRandomItems(DESIGN_OPTIONS.hemlineStyle, 1) : [],
      backDesign: Math.random() > 0.5 ? getRandomItems(DESIGN_OPTIONS.backDesign, 1) : [],

      // Lower probability factors (30-40%)
      slitStyle: Math.random() > 0.6 ? getRandomItems(DESIGN_OPTIONS.slitStyle, 1) : [],
      cuffStyle: Math.random() > 0.6 ? getRandomItems(DESIGN_OPTIONS.cuffStyle, 1) : [],
      yokeStyle: Math.random() > 0.7 ? getRandomItems(DESIGN_OPTIONS.yokeStyle, 1) : [],
      panelDesign: Math.random() > 0.7 ? getRandomItems(DESIGN_OPTIONS.panelDesign, 1) : [],
      placketStyle: Math.random() > 0.7 ? getRandomItems(DESIGN_OPTIONS.placketStyle, 1) : [],
      finishingDetails: Math.random() > 0.5 ? getRandomItems(DESIGN_OPTIONS.finishingDetails, Math.floor(Math.random() * 2) + 1) : [],

      // Styling factors
      colorCombination: Math.random() > 0.5 ? getRandomItems(DESIGN_OPTIONS.colorCombination, 1) : [],
      seasonalStyle: Math.random() > 0.6 ? getRandomItems(DESIGN_OPTIONS.seasonalStyle, 1) : [],
    };

    onFactorsChange(newFactors);
  };

  // Count selected items
  const selectedCount = React.useMemo(() => {
    let count = 0;
    Object.entries(factors).forEach(([key, value]) => {
      if (key === 'customColor' || key === 'embroideryDensity') {
        if (value) count++;
      } else if (Array.isArray(value)) {
        count += value.length;
      }
    });
    return count;
  }, [factors]);

  return (
    <div className="space-y-4">
      {/* Search Bar with Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search design factors... (English / हिंदी)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 relative">
              <Filter className="w-4 h-4" />
              {activeFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Filter Categories</span>
              {activeFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                  Clear all
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {FILTER_CATEGORIES.map((category) => (
              <DropdownMenuCheckboxItem
                key={category.id}
                checked={activeFilters.includes(category.id)}
                onCheckedChange={() => toggleFilter(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {showHindi ? `${category.label} / ${category.labelHi}` : category.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-muted-foreground">Showing:</span>
          {activeFilters.map((filterId) => {
            const category = FILTER_CATEGORIES.find(c => c.id === filterId);
            return category ? (
              <Badge
                key={filterId}
                variant="secondary"
                className="text-xs gap-1 cursor-pointer hover:bg-destructive/20"
                onClick={() => toggleFilter(filterId)}
              >
                {category.icon} {category.label}
                <X className="w-3 h-3" />
              </Badge>
            ) : null;
          })}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Quick Presets Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">
              {showHindi ? 'Quick Presets / त्वरित प्रीसेट' : 'Quick Presets'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selectedCount} selected</span>
            <Button
              variant="outline"
              size="sm"
              onClick={randomizeFactors}
              className="h-7 px-2 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Shuffle className="w-3 h-3" />
              {showHindi ? 'Randomize / यादृच्छिक' : 'Randomize'}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(showAllPresets ? QUICK_PRESETS : QUICK_PRESETS.slice(0, INITIAL_PRESETS_COUNT)).map((preset) => (
            <Badge
              key={preset.id}
              variant="outline"
              className="cursor-pointer transition-all text-xs py-1.5 px-3 hover:bg-primary/10 hover:border-primary"
              onClick={() => applyPreset(preset.factors)}
            >
              {showHindi ? `${preset.label} / ${preset.labelHi}` : preset.label}
            </Badge>
          ))}
          {QUICK_PRESETS.length > INITIAL_PRESETS_COUNT && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllPresets(!showAllPresets)}
              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-primary"
            >
              {showAllPresets ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  {showHindi ? 'Show Less / कम दिखाएं' : 'Show Less'}
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  {showHindi ? `+${QUICK_PRESETS.length - INITIAL_PRESETS_COUNT} More / और` : `+${QUICK_PRESETS.length - INITIAL_PRESETS_COUNT} More`}
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Toggle Controls */}
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        {/* Hindi Labels Toggle */}
        <div className="flex items-center justify-between flex-1 gap-2">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Hindi Labels</span>
            <span className="text-xs text-muted-foreground">(हिंदी)</span>
          </div>
          <Switch
            checked={showHindi}
            onCheckedChange={setShowHindi}
          />
        </div>
      </div>

      {/* Essential Section */}
      {isFilterActive('essential') && (
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-primary" />
              ✨ Essential Options {(showHindi || searchQuery) && '/ मुख्य विकल्प'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Color Selector with Groups */}
            <ColorGroupSelector
              selected={factors.color}
              onSelect={(v) => updateFactor('color', v)}
              showHindi={showHindi}
              searchQuery={searchQuery}
            />

            {/* Fabric with Groups */}
            <GroupedOptionSelector
              title="Fabric"
              titleHi="कपड़ा"
              icon={<Shirt className="w-4 h-4 text-amber-600" />}
              groups={FABRIC_GROUPS}
              selected={factors.fabric}
              onSelect={(v) => updateFactor('fabric', v)}
              translations={DESIGN_OPTIONS_HI.fabric || {}}
              showHindi={showHindi}
              searchQuery={searchQuery}
            />

            {/* Silhouette with Groups */}
            <GroupedOptionSelector
              title="Silhouette"
              titleHi="सिल्हूट"
              icon={<Shirt className="w-4 h-4 text-rose-400" />}
              groups={SILHOUETTE_GROUPS}
              selected={factors.silhouette}
              onSelect={(v) => updateFactor('silhouette', v)}
              translations={DESIGN_OPTIONS_HI.silhouette || {}}
              showHindi={showHindi}
              searchQuery={searchQuery}
            />

            <FactorSection
              title="Occasion"
              titleHi="अवसर"
              categoryKey="occasion"
              icon={<PartyPopper className="w-4 h-4 text-yellow-500" />}
              options={DESIGN_OPTIONS.occasion}
              selected={factors.occasion}
              onSelect={(v) => updateFactor('occasion', v)}
              showHindi={showHindi}
              searchQuery={searchQuery}
            />
          </CardContent>
        </Card>
      )}

      {/* Design Motifs */}
      {isFilterActive('motifs') && (
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ImageIcon className="w-4 h-4 text-purple-500" />
              🎨 Design Motifs {(showHindi || searchQuery) && '/ डिज़ाइन मोटिफ'}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {showHindi
                ? 'Select designs like peacock, elephant, floral patterns / मोर, हाथी, फूल जैसे डिज़ाइन चुनें'
                : 'Select designs like peacock, elephant, floral, temple patterns and more'}
            </p>
          </CardHeader>
          <CardContent>
            <DesignMotifSelector
              selected={factors.designMotifs}
              onSelect={(v) => updateFactor('designMotifs', v)}
              motifPlacements={factors.motifPlacements}
              onPlacementsChange={(v) => updateFactor('motifPlacements', v)}
              onMotifUpdate={(motifs, placements) => {
                onFactorsChange({
                  ...factors,
                  designMotifs: motifs,
                  motifPlacements: placements,
                });
              }}
              showHindi={showHindi}
              searchQuery={searchQuery}
            />
          </CardContent>
        </Card>
      )}

      {/* Color Details */}
      {isFilterActive('color') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="w-4 h-4 text-primary" />
              Color & Fabric {(showHindi || searchQuery) && '/ रंग और कपड़ा'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5 px-1">
              <Label className="text-xs text-muted-foreground">
                Custom Color {(showHindi || searchQuery) && '/ कस्टम रंग'}
              </Label>
              <Input
                placeholder="E.g., Dusty rose with gold accents"
                value={factors.customColor}
                onChange={(e) => updateFactor('customColor', e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            <FactorSection
              title="Color Combination"
              titleHi="रंग संयोजन"
              categoryKey="colorCombination"
              icon={<Grid3X3 className="w-4 h-4 text-violet-500" />}
              options={DESIGN_OPTIONS.colorCombination}
              selected={factors.colorCombination}
              onSelect={(v) => updateFactor('colorCombination', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Lining Type"
              titleHi="अस्तर का प्रकार"
              categoryKey="liningType"
              icon={<Layers className="w-4 h-4 text-slate-500" />}
              options={DESIGN_OPTIONS.liningType}
              selected={factors.liningType}
              onSelect={(v) => updateFactor('liningType', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Embroidery & Embellishments */}
      {isFilterActive('embroidery') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Embroidery & Embellishments {(showHindi || searchQuery) && '/ कढ़ाई और सजावट'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Embroidery with Groups */}
            <GroupedOptionSelector
              title="Embroidery Style"
              titleHi="कढ़ाई शैली"
              icon={<Sparkles className="w-4 h-4 text-yellow-500" />}
              groups={EMBROIDERY_GROUPS}
              selected={factors.embroidery}
              onSelect={(v) => updateFactor('embroidery', v)}
              translations={DESIGN_OPTIONS_HI.embroidery || {}}
              showHindi={showHindi}
              defaultOpenGroups={['traditional']}
            />

            {!factors.embroidery.includes('None') && factors.embroidery.length > 0 && (
              <div className="space-y-2 px-1">
                <Label className="text-xs">
                  Embroidery Density {(showHindi || searchQuery) && '/ कढ़ाई की मात्रा'}
                </Label>
                <ToggleGroup
                  type="single"
                  value={factors.embroideryDensity}
                  onValueChange={(v) => updateFactor('embroideryDensity', v as DesignFactors['embroideryDensity'])}
                  className="justify-start"
                >
                  <ToggleGroupItem value="light" className="text-xs h-7">
                    Light {(showHindi || searchQuery) && '/ हल्की'}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="medium" className="text-xs h-7">
                    Medium {(showHindi || searchQuery) && '/ मध्यम'}
                  </ToggleGroupItem>
                  <ToggleGroupItem value="heavy" className="text-xs h-7">
                    Heavy {(showHindi || searchQuery) && '/ भारी'}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}

            <FactorSection
              title="Embellishments"
              titleHi="सजावट"
              categoryKey="embellishments"
              icon={<Gem className="w-4 h-4 text-pink-500" />}
              options={DESIGN_OPTIONS.embellishments}
              selected={factors.embellishments}
              onSelect={(v) => updateFactor('embellishments', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Border Style"
              titleHi="बॉर्डर शैली"
              categoryKey="borderStyle"
              icon={<Frame className="w-4 h-4 text-emerald-500" />}
              options={DESIGN_OPTIONS.borderStyle}
              selected={factors.borderStyle}
              onSelect={(v) => updateFactor('borderStyle', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Prints & Patterns */}
      {isFilterActive('prints') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Printer className="w-4 h-4 text-primary" />
              Prints & Patterns {(showHindi || searchQuery) && '/ प्रिंट और पैटर्न'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Print Technique with Groups */}
            <GroupedOptionSelector
              title="Print Technique"
              titleHi="प्रिंट तकनीक"
              icon={<Printer className="w-4 h-4 text-blue-500" />}
              groups={PRINT_GROUPS}
              selected={factors.printTechnique}
              onSelect={(v) => updateFactor('printTechnique', v)}
              translations={ADDITIONAL_TRANSLATIONS_HI.printTechnique || {}}
              showHindi={showHindi}
              defaultOpenGroups={['blockPrint']}
            />

            <FactorSection
              title="Motif & Pattern"
              titleHi="मोटिफ और पैटर्न"
              categoryKey="motifPattern"
              icon={<Grid3X3 className="w-4 h-4 text-indigo-500" />}
              options={DESIGN_OPTIONS.motifPattern}
              selected={factors.motifPattern}
              onSelect={(v) => updateFactor('motifPattern', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Silhouette & Cut */}
      {isFilterActive('silhouette') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Ruler className="w-4 h-4 text-emerald-500" />
              Silhouette & Cut {(showHindi || searchQuery) && '/ सिल्हूट और कट'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FactorSection
              title="Length"
              titleHi="लंबाई"
              categoryKey="length"
              icon={<Ruler className="w-4 h-4 text-emerald-500" />}
              options={DESIGN_OPTIONS.length}
              selected={factors.length}
              onSelect={(v) => updateFactor('length', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Hemline Style"
              titleHi="हेमलाइन शैली"
              categoryKey="hemlineStyle"
              icon={<ArrowDownUp className="w-4 h-4 text-cyan-500" />}
              options={DESIGN_OPTIONS.hemlineStyle}
              selected={factors.hemlineStyle}
              onSelect={(v) => updateFactor('hemlineStyle', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Slit Style"
              titleHi="स्लिट शैली"
              categoryKey="slitStyle"
              icon={<Scissors className="w-4 h-4 text-orange-500" />}
              options={DESIGN_OPTIONS.slitStyle}
              selected={factors.slitStyle}
              onSelect={(v) => updateFactor('slitStyle', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Neckline & Collar */}
      {isFilterActive('neckline') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <CircleDot className="w-4 h-4 text-primary" />
              Neckline & Collar {(showHindi || searchQuery) && '/ नेकलाइन और कॉलर'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Neckline with Groups */}
            <GroupedOptionSelector
              title="Neckline"
              titleHi="नेकलाइन"
              icon={<CircleDot className="w-4 h-4 text-primary" />}
              groups={NECKLINE_GROUPS}
              selected={factors.neckline}
              onSelect={(v) => updateFactor('neckline', v)}
              translations={DESIGN_OPTIONS_HI.neckline || {}}
              showHindi={showHindi}
              defaultOpenGroups={['round', 'vNeck']}
            />

            <FactorSection
              title="Collar Style"
              titleHi="कॉलर शैली"
              categoryKey="collarStyle"
              icon={<PanelTop className="w-4 h-4 text-slate-600" />}
              options={DESIGN_OPTIONS.collarStyle}
              selected={factors.collarStyle}
              onSelect={(v) => updateFactor('collarStyle', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Placket Style"
              titleHi="प्लैकेट शैली"
              categoryKey="placketStyle"
              icon={<CircleDashed className="w-4 h-4 text-teal-500" />}
              options={DESIGN_OPTIONS.placketStyle}
              selected={factors.placketStyle}
              onSelect={(v) => updateFactor('placketStyle', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Sleeves & Cuffs */}
      {isFilterActive('sleeves') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <SquareAsterisk className="w-4 h-4 text-amber-600" />
              Sleeves & Cuffs {(showHindi || searchQuery) && '/ आस्तीन और कफ'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Sleeves with Groups */}
            <GroupedOptionSelector
              title="Sleeves"
              titleHi="आस्तीन"
              icon={<SquareAsterisk className="w-4 h-4 text-amber-600" />}
              groups={SLEEVES_GROUPS}
              selected={factors.sleeves}
              onSelect={(v) => updateFactor('sleeves', v)}
              translations={DESIGN_OPTIONS_HI.sleeves || {}}
              showHindi={showHindi}
              defaultOpenGroups={['length']}
            />

            <FactorSection
              title="Cuff Style"
              titleHi="कफ शैली"
              categoryKey="cuffStyle"
              icon={<Grip className="w-4 h-4 text-purple-500" />}
              options={DESIGN_OPTIONS.cuffStyle}
              selected={factors.cuffStyle}
              onSelect={(v) => updateFactor('cuffStyle', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Construction Details */}
      {isFilterActive('construction') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="w-4 h-4 text-slate-600" />
              Construction Details {(showHindi || searchQuery) && '/ निर्माण विवरण'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FactorSection
              title="Yoke Style"
              titleHi="योक शैली"
              categoryKey="yokeStyle"
              icon={<PanelTop className="w-4 h-4 text-rose-400" />}
              options={DESIGN_OPTIONS.yokeStyle}
              selected={factors.yokeStyle}
              onSelect={(v) => updateFactor('yokeStyle', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Panel Design"
              titleHi="पैनल डिज़ाइन"
              categoryKey="panelDesign"
              icon={<Rows className="w-4 h-4 text-blue-400" />}
              options={DESIGN_OPTIONS.panelDesign}
              selected={factors.panelDesign}
              onSelect={(v) => updateFactor('panelDesign', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Back Design"
              titleHi="पीछे का डिज़ाइन"
              categoryKey="backDesign"
              icon={<Shirt className="w-4 h-4 text-indigo-400" />}
              options={DESIGN_OPTIONS.backDesign}
              selected={factors.backDesign}
              onSelect={(v) => updateFactor('backDesign', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Pocket Style"
              titleHi="पॉकेट शैली"
              categoryKey="pocketStyle"
              icon={<CheckSquare className="w-4 h-4 text-amber-500" />}
              options={DESIGN_OPTIONS.pocketStyle}
              selected={factors.pocketStyle}
              onSelect={(v) => updateFactor('pocketStyle', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Closure Type"
              titleHi="क्लोज़र प्रकार"
              categoryKey="closureType"
              icon={<Lock className="w-4 h-4 text-gray-500" />}
              options={DESIGN_OPTIONS.closureType}
              selected={factors.closureType}
              onSelect={(v) => updateFactor('closureType', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Finishing Details"
              titleHi="फिनिशिंग विवरण"
              categoryKey="finishingDetails"
              icon={<CheckSquare className="w-4 h-4 text-teal-500" />}
              options={DESIGN_OPTIONS.finishingDetails}
              selected={factors.finishingDetails}
              onSelect={(v) => updateFactor('finishingDetails', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}

      {/* Model Display */}
      {isFilterActive('model') && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4 text-primary" />
              👩 Model Display {(showHindi || searchQuery) && '/ मॉडल प्रदर्शन'}
              <Badge variant="secondary" className="text-xs">New</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FactorSection
              title="Skin Tone"
              titleHi="त्वचा का रंग"
              categoryKey="modelSkinTone"
              icon={<Palette className="w-4 h-4 text-amber-500" />}
              options={DESIGN_OPTIONS.modelSkinTone}
              selected={factors.modelSkinTone}
              onSelect={(v) => updateFactor('modelSkinTone', v)}
              showHindi={showHindi}
              defaultOpen={true}
            />

            <FactorSection
              title="Height"
              titleHi="ऊंचाई"
              categoryKey="modelHeight"
              icon={<Ruler className="w-4 h-4 text-emerald-500" />}
              options={DESIGN_OPTIONS.modelHeight}
              selected={factors.modelHeight}
              onSelect={(v) => updateFactor('modelHeight', v)}
              showHindi={showHindi}
              defaultOpen={true}
            />

            <FactorSection
              title="Pose"
              titleHi="मुद्रा"
              categoryKey="modelPose"
              icon={<Users className="w-4 h-4 text-violet-500" />}
              options={DESIGN_OPTIONS.modelPose}
              selected={factors.modelPose}
              onSelect={(v) => updateFactor('modelPose', v)}
              showHindi={showHindi}
              defaultOpen={true}
            />
          </CardContent>
        </Card>
      )}

      {/* Occasion & Styling */}
      {isFilterActive('occasion') && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <PartyPopper className="w-4 h-4 text-pink-500" />
              Occasion & Styling {(showHindi || searchQuery) && '/ अवसर और स्टाइलिंग'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FactorSection
              title="Seasonal Style"
              titleHi="मौसमी शैली"
              categoryKey="seasonalStyle"
              icon={<Thermometer className="w-4 h-4 text-orange-400" />}
              options={DESIGN_OPTIONS.seasonalStyle}
              selected={factors.seasonalStyle}
              onSelect={(v) => updateFactor('seasonalStyle', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Body Type"
              titleHi="शरीर का प्रकार"
              categoryKey="bodyType"
              icon={<Users className="w-4 h-4 text-blue-400" />}
              options={DESIGN_OPTIONS.bodyType}
              selected={factors.bodyType}
              onSelect={(v) => updateFactor('bodyType', v)}
              showHindi={showHindi}
            />

            <FactorSection
              title="Age Group"
              titleHi="आयु वर्ग"
              categoryKey="ageGroup"
              icon={<Calendar className="w-4 h-4 text-green-500" />}
              options={DESIGN_OPTIONS.ageGroup}
              selected={factors.ageGroup}
              onSelect={(v) => updateFactor('ageGroup', v)}
              showHindi={showHindi}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
