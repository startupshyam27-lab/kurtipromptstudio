import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DesignFactors } from '@/types/kurti';
import { getMotifName, getMotifHindi } from '@/data/designMotifs';
import {
  Palette, Shirt, Sparkles, CircleDot, Ruler, Frame, Printer,
  PartyPopper, Gem, Scissors, Layers, Users, Calendar, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionSummaryProps {
  factors: DesignFactors;
  hindiPrompt?: boolean;
  onRemove?: (category: keyof DesignFactors, value: string) => void;
  compact?: boolean;
}

interface FactorCategory {
  key: keyof DesignFactors;
  label: string;
  labelHi: string;
  icon: React.ReactNode;
  group: string;
}

const FACTOR_CATEGORIES: FactorCategory[] = [
  // Core Design
  { key: 'color', label: 'Colors', labelHi: 'रंग', icon: <Palette className="w-3 h-3" />, group: 'Core' },
  { key: 'fabric', label: 'Fabric', labelHi: 'कपड़ा', icon: <Shirt className="w-3 h-3" />, group: 'Core' },
  { key: 'silhouette', label: 'Silhouette', labelHi: 'सिल्हूट', icon: <CircleDot className="w-3 h-3" />, group: 'Core' },
  { key: 'length', label: 'Length', labelHi: 'लंबाई', icon: <Ruler className="w-3 h-3" />, group: 'Core' },
  { key: 'colorCombination', label: 'Color Combo', labelHi: 'रंग संयोजन', icon: <Palette className="w-3 h-3" />, group: 'Core' },

  // Neckline & Sleeves
  { key: 'neckline', label: 'Neckline', labelHi: 'नेकलाइन', icon: <CircleDot className="w-3 h-3" />, group: 'Neckline' },
  { key: 'collarStyle', label: 'Collar', labelHi: 'कॉलर', icon: <CircleDot className="w-3 h-3" />, group: 'Neckline' },
  { key: 'sleeves', label: 'Sleeves', labelHi: 'आस्तीन', icon: <Shirt className="w-3 h-3" />, group: 'Neckline' },
  { key: 'cuffStyle', label: 'Cuffs', labelHi: 'कफ', icon: <Shirt className="w-3 h-3" />, group: 'Neckline' },

  // Embroidery & Embellishments
  { key: 'embroidery', label: 'Embroidery', labelHi: 'कढ़ाई', icon: <Sparkles className="w-3 h-3" />, group: 'Embroidery' },
  { key: 'embellishments', label: 'Embellishments', labelHi: 'सजावट', icon: <Gem className="w-3 h-3" />, group: 'Embroidery' },
  { key: 'designMotifs', label: 'Design Motifs', labelHi: 'डिज़ाइन मोटिफ', icon: <Sparkles className="w-3 h-3" />, group: 'Embroidery' },
  { key: 'motifPattern', label: 'Motif Pattern', labelHi: 'मोटिफ पैटर्न', icon: <Sparkles className="w-3 h-3" />, group: 'Embroidery' },

  // Prints & Borders
  { key: 'printTechnique', label: 'Print', labelHi: 'प्रिंट', icon: <Printer className="w-3 h-3" />, group: 'Prints' },
  { key: 'borderStyle', label: 'Border', labelHi: 'बॉर्डर', icon: <Frame className="w-3 h-3" />, group: 'Prints' },
  { key: 'hemlineStyle', label: 'Hemline', labelHi: 'हेमलाइन', icon: <Scissors className="w-3 h-3" />, group: 'Prints' },

  // Construction
  { key: 'backDesign', label: 'Back Design', labelHi: 'बैक डिज़ाइन', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'slitStyle', label: 'Slit', labelHi: 'स्लिट', icon: <Scissors className="w-3 h-3" />, group: 'Construction' },
  { key: 'placketStyle', label: 'Placket', labelHi: 'प्लैकेट', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'panelDesign', label: 'Panels', labelHi: 'पैनल', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'yokeStyle', label: 'Yoke', labelHi: 'योक', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'pocketStyle', label: 'Pockets', labelHi: 'पॉकेट', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'closureType', label: 'Closure', labelHi: 'क्लोज़र', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'liningType', label: 'Lining', labelHi: 'लाइनिंग', icon: <Layers className="w-3 h-3" />, group: 'Construction' },
  { key: 'finishingDetails', label: 'Finishing', labelHi: 'फिनिशिंग', icon: <Scissors className="w-3 h-3" />, group: 'Construction' },

  // Occasion & Styling
  { key: 'occasion', label: 'Occasion', labelHi: 'अवसर', icon: <PartyPopper className="w-3 h-3" />, group: 'Styling' },
  { key: 'seasonalStyle', label: 'Season', labelHi: 'मौसम', icon: <Calendar className="w-3 h-3" />, group: 'Styling' },
  { key: 'bodyType', label: 'Body Type', labelHi: 'शरीर प्रकार', icon: <Users className="w-3 h-3" />, group: 'Styling' },
  { key: 'ageGroup', label: 'Age Group', labelHi: 'आयु वर्ग', icon: <Users className="w-3 h-3" />, group: 'Styling' },

  // Model
  { key: 'modelSkinTone', label: 'Skin Tone', labelHi: 'त्वचा का रंग', icon: <Users className="w-3 h-3" />, group: 'Model' },
  { key: 'modelHeight', label: 'Height', labelHi: 'ऊंचाई', icon: <Ruler className="w-3 h-3" />, group: 'Model' },
  { key: 'modelPose', label: 'Pose', labelHi: 'मुद्रा', icon: <Users className="w-3 h-3" />, group: 'Model' },
];

const GROUP_COLORS: Record<string, string> = {
  Core: 'bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-300 dark:border-blue-800',
  Neckline: 'bg-purple-500/10 text-purple-700 border-purple-200 dark:text-purple-300 dark:border-purple-800',
  Embroidery: 'bg-pink-500/10 text-pink-700 border-pink-200 dark:text-pink-300 dark:border-pink-800',
  Prints: 'bg-orange-500/10 text-orange-700 border-orange-200 dark:text-orange-300 dark:border-orange-800',
  Construction: 'bg-green-500/10 text-green-700 border-green-200 dark:text-green-300 dark:border-green-800',
  Styling: 'bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-300 dark:border-amber-800',
  Model: 'bg-teal-500/10 text-teal-700 border-teal-200 dark:text-teal-300 dark:border-teal-800',
};

const SKIP_VALUES = [
  'None', 'No Border', 'Plain Back', 'No Slit', 'No Placket',
  'No Panels', 'No Yoke', 'No Pockets', 'Pullover (No Closure)',
  'Unlined', 'No Collar', 'No Cuff', 'All Body Types', 'All Ages'
];

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  factors,
  hindiPrompt = false,
  onRemove,
  compact = false,
}) => {
  // Get all selected factors grouped by category
  const selectedFactors = FACTOR_CATEGORIES.map((category) => {
    const values = factors[category.key];
    if (!values || (Array.isArray(values) && values.length === 0)) return null;

    const arrayValues = Array.isArray(values) ? values : [values];
    const filteredValues = (arrayValues as any[]).filter(v => v && !SKIP_VALUES.includes(v));

    if (filteredValues.length === 0) return null;

    return {
      ...category,
      values: filteredValues,
    };
  }).filter(Boolean);

  // Add custom color
  if (factors.customColor) {
    const existingColor = selectedFactors.find(f => f?.key === 'color');
    if (existingColor) {
      existingColor.values = [...existingColor.values, factors.customColor];
    } else {
      selectedFactors.unshift({
        key: 'color' as keyof DesignFactors,
        label: 'Colors',
        labelHi: 'रंग',
        icon: <Palette className="w-3 h-3" />,
        group: 'Core',
        values: [factors.customColor],
      });
    }
  }

  // Add embroidery density
  if (factors.embroideryDensity) {
    const existingEmbroidery = selectedFactors.find(f => f?.key === 'embroidery');
    if (existingEmbroidery) {
      const densityLabel = hindiPrompt
        ? { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' }[factors.embroideryDensity] || factors.embroideryDensity
        : factors.embroideryDensity;
      existingEmbroidery.values = [...existingEmbroidery.values, `(${densityLabel})`];
    }
  }

  const totalSelected = selectedFactors.reduce((sum, f) => sum + (f?.values.length || 0), 0);

  if (totalSelected === 0) {
    return (
      <Card className={cn("border-dashed", compact && "p-3")}>
        <CardContent className={cn("py-6 text-center", compact && "py-3")}>
          <p className="text-muted-foreground text-sm">
            {hindiPrompt
              ? 'कोई डिज़ाइन फैक्टर चयनित नहीं है। ऊपर से चुनें।'
              : 'No design factors selected. Choose from above.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group by category group
  const groupedFactors = selectedFactors.reduce((acc, factor) => {
    if (!factor) return acc;
    if (!acc[factor.group]) acc[factor.group] = [];
    acc[factor.group].push(factor);
    return acc;
  }, {} as Record<string, typeof selectedFactors>);

  const getDisplayValue = (category: typeof FACTOR_CATEGORIES[0], value: string) => {
    if (category.key === 'designMotifs') {
      const name = hindiPrompt ? getMotifHindi(value) : getMotifName(value);

      // Find placements for this motif
      const placement = factors.motifPlacements?.find(p => p.motifId === value);
      if (placement && placement.placements.length > 0) {
        return `${name} (${placement.placements.join(', ')})`;
      }

      return name;
    }
    return value;
  };

  return (
    <Card className={cn(compact && "p-0 border-0 shadow-none bg-transparent")}>
      {!compact && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>{hindiPrompt ? '📋 चयनित डिज़ाइन फैक्टर' : '📋 Selected Design Factors'}</span>
            <Badge variant="secondary" className="text-xs">
              {totalSelected} {hindiPrompt ? 'चयनित' : 'selected'}
            </Badge>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("space-y-3", compact && "p-0")}>
        {Object.entries(groupedFactors).map(([groupName, categories]) => (
          <div key={groupName} className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {groupName}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) =>
                category?.values.map((value, idx) => (
                  <Badge
                    key={`${category.key}-${value}-${idx}`}
                    variant="outline"
                    className={cn(
                      "text-xs py-1 px-2 gap-1 transition-all",
                      GROUP_COLORS[category.group],
                      onRemove && "pr-1 hover:bg-destructive/10"
                    )}
                  >
                    {category.icon}
                    <span className="max-w-[150px] truncate">
                      {getDisplayValue(category, value as string)}
                    </span>
                    {onRemove && !(value as string).startsWith('(') && (
                      <button
                        onClick={() => onRemove(category.key, value as string)}
                        className="ml-0.5 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
