import React, { useMemo, useState } from 'react';
import { Copy, Check, FileText, Sparkles, Zap, Briefcase, Wand2, Grid2X2, FlipHorizontal, Square, RotateCcw, ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { DesignFactors, PromptStyle } from '@/types/kurti';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { DESIGN_OPTIONS_HI } from '@/contexts/LanguageContext';
import { ADDITIONAL_TRANSLATIONS_HI } from '@/data/designGroups';
import { COLOR_TRANSLATIONS_HI } from '@/data/colorGroups';
import { getMotifName, getMotifHindi, DESIGN_MOTIF_GROUPS } from '@/data/designMotifs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SelectionSummary } from './SelectionSummary';

export type LayoutType = 'single' | 'front-back' | '4-variations' | 'full-view';

interface PromptGeneratorProps {
  factors: DesignFactors;
  onFactorsChange?: (factors: DesignFactors) => void;
  hindiPrompt?: boolean;
  onHindiPromptChange?: (value: boolean) => void;
}

// Get Hindi translation for an option
const getHindiLabel = (category: string, option: string): string => {
  const allTranslations: Record<string, Record<string, string>> = {
    ...DESIGN_OPTIONS_HI,
    ...ADDITIONAL_TRANSLATIONS_HI,
    color: COLOR_TRANSLATIONS_HI,
  };
  return allTranslations[category]?.[option] || option;
};

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({
  factors,
  onFactorsChange,
  hindiPrompt = false,
  onHindiPromptChange,
}) => {
  const [style, setStyle] = useState<PromptStyle>('detailed');
  const [layoutType, setLayoutType] = useState<LayoutType>('single');
  const [copied, setCopied] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false); // State for Hindi translation popup
  const [showSummary, setShowSummary] = useState(true);
  const [showTranslateDialog, setShowTranslateDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // Helper to get label based on language
  const handleRemoveFactor = (category: keyof DesignFactors, value: string) => {
    if (!onFactorsChange) return;

    const currentValue = factors[category];

    if (category === 'customColor') {
      // Handle customColor (string, not array)
      onFactorsChange({ ...factors, customColor: '' });
    } else if (category === 'embroideryDensity') {
      // Handle embroideryDensity (string, not array)
      onFactorsChange({ ...factors, embroideryDensity: '' });
    } else if (Array.isArray(currentValue)) {
      // Handle array-based factors
      const newValue = currentValue.filter(v => v !== value);
      onFactorsChange({ ...factors, [category]: newValue });
    }

    toast.success(hindiPrompt ? 'फैक्टर हटाया गया' : 'Factor removed');
  };

  // Helper to get label based on language
  const getLabel = (category: string, options: string[]): string => {
    if (!hindiPrompt) return options.join(', ');
    return options.map(opt => getHindiLabel(category, opt)).join(', ');
  };

  const generatePrompt = useMemo(() => {
    const sections: string[] = [];

    // Helper to build common kurti description
    const buildKurtiDescription = (isHindi: boolean): string[] => {
      const parts: string[] = [];
      if (isHindi) {
        // Core design elements
        if (factors.silhouette.length) parts.push(`${getLabel('silhouette', factors.silhouette)} सिल्हूट`);
        if (factors.fabric.length) parts.push(`${getLabel('fabric', factors.fabric)} कपड़े से बना`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          parts.push(`${getLabel('color', colors)} रंग में`);
        }
        if (factors.colorCombination.length) parts.push(`${getLabel('colorCombination', factors.colorCombination)} रंग संयोजन`);
        if (factors.length.length) parts.push(`${getLabel('length', factors.length)} लंबाई`);

        // Neckline, sleeves, collar
        if (factors.neckline.length) parts.push(`${getLabel('neckline', factors.neckline)} नेकलाइन के साथ`);
        if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) parts.push(`${getLabel('collarStyle', factors.collarStyle)} कॉलर`);
        if (factors.sleeves.length) parts.push(`${getLabel('sleeves', factors.sleeves)} आस्तीन`);
        if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) parts.push(`${getLabel('cuffStyle', factors.cuffStyle)} कफ`);

        // Embroidery and embellishments
        if (factors.embroidery.length && !factors.embroidery.includes('None')) {
          let embText = getLabel('embroidery', factors.embroidery) + ' कढ़ाई';
          if (factors.embroideryDensity) {
            const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
            embText += ` (${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity})`;
          }
          parts.push(`${embText} के साथ`);
        }
        if (factors.embellishments.length) parts.push(`${getLabel('embellishments', factors.embellishments)} सजावट`);

        // Print and patterns
        if (factors.printTechnique.length) parts.push(`${getLabel('printTechnique', factors.printTechnique)} प्रिंट`);
        if (factors.motifPattern.length) parts.push(`${getLabel('motifPattern', factors.motifPattern)} मोटिफ`);
        if (factors.designMotifs.length) {
          // Include placement information if available
          if (factors.motifPlacements && factors.motifPlacements.length > 0) {
            const motifDescriptions = factors.motifPlacements.map(mp => {
              const motifNameHi = getMotifHindi(mp.motifId);
              const placements = mp.placements.join(', ');
              return `${motifNameHi} (${placements} पर)`;
            });
            parts.push(`${motifDescriptions.join(', ')} डिज़ाइन मोटिफ के साथ`);
          } else {
            const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
            parts.push(`${motifNamesHi.join(', ')} डिज़ाइन मोटिफ के साथ`);
          }
        }

        // Border and hemline
        if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) parts.push(`${getLabel('borderStyle', factors.borderStyle)} बॉर्डर`);
        if (factors.hemlineStyle.length) parts.push(`${getLabel('hemlineStyle', factors.hemlineStyle)} हेमलाइन`);

        // Construction details
        if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) parts.push(`${getLabel('backDesign', factors.backDesign)} बैक डिज़ाइन`);
        if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) parts.push(`${getLabel('slitStyle', factors.slitStyle)} स्लिट`);
        if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) parts.push(`${getLabel('placketStyle', factors.placketStyle)} प्लैकेट`);
        if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) parts.push(`${getLabel('panelDesign', factors.panelDesign)} पैनल`);
        if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) parts.push(`${getLabel('yokeStyle', factors.yokeStyle)} योक`);
        if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) parts.push(`${getLabel('pocketStyle', factors.pocketStyle)} पॉकेट`);
        if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) parts.push(`${getLabel('closureType', factors.closureType)} क्लोज़र`);
        if (factors.liningType.length && !factors.liningType.includes('Unlined')) parts.push(`${getLabel('liningType', factors.liningType)} लाइनिंग`);
        if (factors.finishingDetails.length) parts.push(`${getLabel('finishingDetails', factors.finishingDetails)} फिनिशिंग`);

        // Occasion and styling
        if (factors.occasion.length) parts.push(`${getLabel('occasion', factors.occasion)} के लिए डिज़ाइन किया गया`);
        if (factors.seasonalStyle.length) parts.push(`${getLabel('seasonalStyle', factors.seasonalStyle)} कलेक्शन`);
        if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) parts.push(`${getLabel('bodyType', factors.bodyType)} के लिए उपयुक्त`);
        if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) parts.push(`${getLabel('ageGroup', factors.ageGroup)} के लिए`);
      } else {
        // Core design elements
        if (factors.silhouette.length) parts.push(`${factors.silhouette.join('/')} silhouette`);
        if (factors.fabric.length) parts.push(`made of ${factors.fabric.join(' or ')}`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          parts.push(`in ${colors.join(', ')} color${colors.length > 1 ? 's' : ''}`);
        }
        if (factors.colorCombination.length) parts.push(`${factors.colorCombination.join('/')} color combination`);
        if (factors.length.length) parts.push(`${factors.length.join('/')} length`);

        // Neckline, sleeves, collar
        if (factors.neckline.length) parts.push(`with ${factors.neckline.join('/')} neckline`);
        if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) parts.push(`${factors.collarStyle.join('/')} collar`);
        if (factors.sleeves.length) parts.push(`${factors.sleeves.join('/')} sleeves`);
        if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) parts.push(`${factors.cuffStyle.join('/')} cuffs`);

        // Embroidery and embellishments
        if (factors.embroidery.length && !factors.embroidery.includes('None')) {
          let embText = factors.embroidery.join(' and ') + ' embroidery';
          if (factors.embroideryDensity) embText += ` (${factors.embroideryDensity} coverage)`;
          parts.push(`featuring ${embText}`);
        }
        if (factors.embellishments.length) parts.push(`with ${factors.embellishments.join(', ')} embellishments`);

        // Print and patterns
        if (factors.printTechnique.length) parts.push(`${factors.printTechnique.join('/')} print`);
        if (factors.motifPattern.length) parts.push(`${factors.motifPattern.join('/')} motif`);
        if (factors.designMotifs.length) {
          // Include placement information if available
          if (factors.motifPlacements && factors.motifPlacements.length > 0) {
            const motifDescriptions = factors.motifPlacements.map(mp => {
              const motifName = getMotifName(mp.motifId);
              const placements = mp.placements.join(', ');
              return `${motifName} on ${placements}`;
            });
            parts.push(`with ${motifDescriptions.join('; ')} design motifs`);
          } else {
            const motifNames = factors.designMotifs.map(id => getMotifName(id));
            parts.push(`with ${motifNames.join(', ')} design motifs`);
          }
        }

        // Border and hemline
        if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) parts.push(`${factors.borderStyle.join('/')} border`);
        if (factors.hemlineStyle.length) parts.push(`${factors.hemlineStyle.join('/')} hemline`);

        // Construction details
        if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) parts.push(`${factors.backDesign.join('/')} back design`);
        if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) parts.push(`${factors.slitStyle.join('/')} slit`);
        if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) parts.push(`${factors.placketStyle.join('/')} placket`);
        if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) parts.push(`${factors.panelDesign.join('/')} panels`);
        if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) parts.push(`${factors.yokeStyle.join('/')} yoke`);
        if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) parts.push(`${factors.pocketStyle.join('/')} pockets`);
        if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) parts.push(`${factors.closureType.join('/')} closure`);
        if (factors.liningType.length && !factors.liningType.includes('Unlined')) parts.push(`${factors.liningType.join('/')} lining`);
        if (factors.finishingDetails.length) parts.push(`${factors.finishingDetails.join(', ')} finishing`);

        // Occasion and styling
        if (factors.occasion.length) parts.push(`designed for ${factors.occasion.join('/')}`);
        if (factors.seasonalStyle.length) parts.push(`${factors.seasonalStyle.join('/')} collection`);
        if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) parts.push(`suitable for ${factors.bodyType.join('/')} body type`);
        if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) parts.push(`for ${factors.ageGroup.join('/')} age group`);
      }
      return parts;
    };

    // Helper to build model description
    const buildModelDescription = (isHindi: boolean): string => {
      const modelParts: string[] = [];
      if (isHindi) {
        if (factors.modelSkinTone.length) modelParts.push(`${getLabel('modelSkinTone', factors.modelSkinTone)} त्वचा का रंग`);
        if (factors.modelHeight.length) modelParts.push(`${getLabel('modelHeight', factors.modelHeight)} ऊंचाई`);
        if (factors.modelPose.length) modelParts.push(`${getLabel('modelPose', factors.modelPose)} मुद्रा`);
        if (modelParts.length > 0) {
          return `मॉडल: ${modelParts.join(', ')} वाली भारतीय महिला।`;
        }
        return 'मॉडल: मध्यम त्वचा रंग, औसत ऊंचाई, सामने खड़ी मुद्रा वाली भारतीय महिला।';
      } else {
        if (factors.modelSkinTone.length) modelParts.push(`${factors.modelSkinTone.join('/')} skin tone`);
        if (factors.modelHeight.length) modelParts.push(`${factors.modelHeight.join('/')} height`);
        if (factors.modelPose.length) modelParts.push(`${factors.modelPose.join('/')} pose`);
        if (modelParts.length > 0) {
          return `Model: Indian woman with ${modelParts.join(', ')}.`;
        }
        return 'Model: Indian woman with medium skin tone, average height, standing front pose.';
      }
    };

    // SINGLE KURTI LAYOUT
    if (layoutType === 'single') {
      if (style === 'short') {
        if (hindiPrompt) {
          sections.push('🎨 **AI इमेज जनरेशन प्रॉम्प्ट - भारतीय कुर्ती डिज़ाइन**\n');
          sections.push('एक उत्कृष्ट, फैशन-फॉरवर्ड भारतीय कुर्ती डिज़ाइन बनाएं जो एक सुंदर मॉडल द्वारा पहनी गई हो।\n');
          sections.push(buildModelDescription(true) + '\n');

          sections.push('**कुर्ती डिज़ाइन विवरण:**');
          const parts = buildKurtiDescription(true);
          if (parts.length > 0) {
            sections.push(parts.join(', ') + '।');
          }

          sections.push('\n**📸 AI इमेज रेंडरिंग स्पेसिफिकेशन:**');
          sections.push('• फोटोरियलिस्टिक, हाई-फैशन एडिटोरियल फोटोग्राफी');
          sections.push('• सॉफ्ट स्टूडियो लाइटिंग, 3-पॉइंट लाइटिंग सेटअप');
          sections.push('• शार्प फोकस, बोकेह बैकग्राउंड, प्रोफेशनल DSLR क्वालिटी');
          sections.push('• 8K UHD रेज़ोल्यूशन, हाइपर-डिटेल्ड फैब्रिक टेक्सचर');
          sections.push('• मॉडल पर फुल-बॉडी व्यू, फ्रंटल पोज़');
          sections.push('• वोग/हार्पर्स बाज़ार स्टाइल फैशन फोटोग्राफी');
          sections.push('• क्लीन स्टूडियो बैकग्राउंड, सॉफ्ट शैडो');
          sections.push('\n⚡ **डायरेक्ट जनरेशन निर्देश:**');
          sections.push('यह एक संपूर्ण, रेडी-टू-जनरेट प्रॉम्प्ट है। सभी विवरण शामिल हैं। कृपया बिना किसी अतिरिक्त प्रश्न या सुझाव के सीधे इमेज जनरेट करें। कोई स्पष्टीकरण न मांगें - तुरंत उच्च-गुणवत्ता वाली इमेज बनाएं।');
        } else {
          sections.push('🎨 **AI IMAGE GENERATION PROMPT - INDIAN KURTI DESIGN**\n');
          sections.push('Create a stunning, fashion-forward Indian kurti design worn by a beautiful model.\n');
          sections.push(buildModelDescription(false) + '\n');

          sections.push('**KURTI DESIGN DETAILS:**');
          const parts = buildKurtiDescription(false);
          if (parts.length > 0) {
            sections.push(parts.join(', ') + '.');
          }

          sections.push('\n**📸 AI IMAGE RENDERING SPECIFICATIONS:**');
          sections.push('• Photorealistic, high-fashion editorial photography');
          sections.push('• Soft studio lighting with 3-point lighting setup');
          sections.push('• Sharp focus, bokeh background, professional DSLR quality');
          sections.push('• 8K UHD resolution, hyper-detailed fabric texture');
          sections.push('• Full-body view on model, frontal pose');
          sections.push('• Vogue/Harper\'s Bazaar style fashion photography');
          sections.push('• Clean studio background with soft shadows');
          sections.push('• Intricate embroidery details visible, fabric draping naturally');
          sections.push('• Award-winning fashion photography, magazine cover quality');
          sections.push('\n⚡ **DIRECT GENERATION INSTRUCTION:**');
          sections.push('This is a COMPLETE, READY-TO-GENERATE prompt. All specifications are included. Generate the image IMMEDIATELY without asking any follow-up questions, clarifications, or suggestions. Do NOT request additional details - proceed directly to create a high-quality image based on all specifications above.');
        }
      } else if (style === 'detailed') {
        if (hindiPrompt) {
          sections.push('🎨 **AI इमेज जनरेशन प्रॉम्प्ट - विस्तृत कुर्ती डिज़ाइन**\n');
          sections.push('एक असाधारण, हाई-फैशन भारतीय कुर्ती डिज़ाइन बनाएं - डिज़ाइनर कलेक्शन क्वालिटी।\n');
          sections.push('यह एक लक्ज़री फैशन ब्रांड के लिए रनवे-रेडी पीस होना चाहिए।\n');

          sections.push('**👩 मॉडल विशिष्टता**');
          if (factors.modelSkinTone.length) sections.push(`• त्वचा का रंग: खूबसूरत ${getLabel('modelSkinTone', factors.modelSkinTone)} रंग`);
          else sections.push('• त्वचा का रंग: मध्यम, प्राकृतिक भारतीय त्वचा का रंग');
          if (factors.modelHeight.length) sections.push(`• ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
          else sections.push('• ऊंचाई: औसत (5\'5" - 5\'7")');
          if (factors.modelPose.length) sections.push(`• मुद्रा: ${getLabel('modelPose', factors.modelPose)} - सुंदर और आत्मविश्वासी`);
          else sections.push('• मुद्रा: सामने खड़ी मुद्रा - सुंदर और आत्मविश्वासी');

          sections.push('\n**📐 सिल्हूट और संरचना**');
          if (factors.silhouette.length) sections.push(`• सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.length.length) sections.push(`• लंबाई: ${getLabel('length', factors.length)}`);
          if (factors.hemlineStyle.length) sections.push(`• हेमलाइन: ${getLabel('hemlineStyle', factors.hemlineStyle)}`);

          sections.push('\n**🧵 कपड़ा और रंग**');
          if (factors.fabric.length) sections.push(`• कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• रंग: ${getLabel('color', colors)}`);
          }
          if (factors.colorCombination.length) sections.push(`• रंग संयोजन: ${getLabel('colorCombination', factors.colorCombination)}`);
          if (factors.liningType.length && !factors.liningType.includes('Unlined')) sections.push(`• लाइनिंग: ${getLabel('liningType', factors.liningType)}`);

          sections.push('\n**👗 नेकलाइन और आस्तीन**');
          if (factors.neckline.length) sections.push(`• नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) sections.push(`• कॉलर: ${getLabel('collarStyle', factors.collarStyle)}`);
          if (factors.sleeves.length) sections.push(`• आस्तीन: ${getLabel('sleeves', factors.sleeves)}`);
          if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) sections.push(`• कफ: ${getLabel('cuffStyle', factors.cuffStyle)}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ कढ़ाई और सजावट**');
            sections.push(`• कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
            if (factors.embroideryDensity) {
              const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
              sections.push(`• घनत्व: ${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity}`);
            }
            if (factors.embellishments.length) sections.push(`• सजावट: ${getLabel('embellishments', factors.embellishments)}`);
          } else if (factors.embellishments.length) {
            sections.push('\n**✨ सजावट**');
            sections.push(`• सजावट: ${getLabel('embellishments', factors.embellishments)}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\n**🖨️ प्रिंट और बॉर्डर**');
            if (factors.printTechnique.length) sections.push(`• प्रिंट: ${getLabel('printTechnique', factors.printTechnique)}`);
            if (factors.motifPattern.length) sections.push(`• मोटिफ पैटर्न: ${getLabel('motifPattern', factors.motifPattern)}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`• बॉर्डर: ${getLabel('borderStyle', factors.borderStyle)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 डिज़ाइन मोटिफ**');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifHindi(mp.motifId);
                const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`• मोटिफ: ${motifDescriptions.join(', ')}`);
            } else {
              const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
              sections.push(`• मोटिफ: ${motifNamesHi.join(', ')}`);
            }
          }

          // Construction details section
          const hasConstruction = factors.backDesign.length || factors.slitStyle.length || factors.placketStyle.length ||
            factors.panelDesign.length || factors.yokeStyle.length || factors.pocketStyle.length ||
            factors.closureType.length || factors.finishingDetails.length;
          if (hasConstruction) {
            sections.push('\n**🔧 निर्माण विवरण**');
            if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) sections.push(`• बैक डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
            if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`• स्लिट: ${getLabel('slitStyle', factors.slitStyle)}`);
            if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) sections.push(`• प्लैकेट: ${getLabel('placketStyle', factors.placketStyle)}`);
            if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) sections.push(`• पैनल: ${getLabel('panelDesign', factors.panelDesign)}`);
            if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) sections.push(`• योक: ${getLabel('yokeStyle', factors.yokeStyle)}`);
            if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`• पॉकेट: ${getLabel('pocketStyle', factors.pocketStyle)}`);
            if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) sections.push(`• क्लोज़र: ${getLabel('closureType', factors.closureType)}`);
            if (factors.finishingDetails.length) sections.push(`• फिनिशिंग: ${getLabel('finishingDetails', factors.finishingDetails)}`);
          }

          // Occasion & Styling
          const hasOccasion = factors.occasion.length || factors.seasonalStyle.length || factors.bodyType.length || factors.ageGroup.length;
          if (hasOccasion) {
            sections.push('\n**🎉 अवसर और स्टाइलिंग**');
            if (factors.occasion.length) sections.push(`• अवसर: ${getLabel('occasion', factors.occasion)}`);
            if (factors.seasonalStyle.length) sections.push(`• मौसम: ${getLabel('seasonalStyle', factors.seasonalStyle)}`);
            if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) sections.push(`• शरीर प्रकार: ${getLabel('bodyType', factors.bodyType)}`);
            if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) sections.push(`• आयु वर्ग: ${getLabel('ageGroup', factors.ageGroup)}`);
          }

          sections.push('\n**📸 AI इमेज रेंडरिंग - डिज़ाइनर क्वालिटी**');
          sections.push('• स्टाइल: हाई-फैशन एडिटोरियल फोटोग्राफी, वोग इंडिया क्वालिटी');
          sections.push('• लाइटिंग: सॉफ्ट डिफ्यूज़्ड स्टूडियो लाइटिंग, रिम लाइट एक्सेंट');
          sections.push('• कैमरा: Canon EOS R5, 85mm पोर्ट्रेट लेंस, f/2.8 एपर्चर');
          sections.push('• रेज़ोल्यूशन: 8K UHD, फोटोरियलिस्टिक, हाइपर-डिटेल्ड');
          sections.push('• फैब्रिक: इंट्रिकेट टेक्सचर विज़िबल, नेचुरल ड्रेपिंग');
          sections.push('• बैकग्राउंड: क्लीन स्टूडियो, सॉफ्ट ग्रेडिएंट, बोकेह');
          sections.push('• मूड: एलिगेंट, सोफिस्टिकेटेड, लक्ज़री फैशन');
          sections.push('• पोस्ट-प्रोसेसिंग: मैगज़ीन कवर रेडी, कलर ग्रेडेड');
          sections.push('\n⚡ **डायरेक्ट जनरेशन निर्देश:**');
          sections.push('यह एक संपूर्ण, रेडी-टू-जनरेट प्रॉम्प्ट है। सभी डिज़ाइन स्पेसिफिकेशन विस्तार से दिए गए हैं। कृपया बिना किसी अतिरिक्त प्रश्न, स्पष्टीकरण, या सुझाव के सीधे इमेज जनरेट करें। अभी उच्च-गुणवत्ता वाली इमेज बनाएं।');
        } else {
          sections.push('🎨 **AI IMAGE GENERATION PROMPT - DETAILED KURTI DESIGN**\n');
          sections.push('Create an extraordinary, high-fashion Indian kurti design - designer collection quality.\n');
          sections.push('This should be a runway-ready piece for a luxury fashion brand.\n');

          sections.push('**👩 MODEL SPECIFICATION**');
          if (factors.modelSkinTone.length) sections.push(`• Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          else sections.push('• Skin Tone: Medium, natural Indian skin tone');
          if (factors.modelHeight.length) sections.push(`• Height: ${factors.modelHeight.join(', ')}`);
          else sections.push('• Height: Average (5\'5" - 5\'7")');
          if (factors.modelPose.length) sections.push(`• Pose: ${factors.modelPose.join(', ')}`);
          else sections.push('• Pose: Standing front pose');

          sections.push('\n**📐 SILHOUETTE & STRUCTURE**');
          if (factors.silhouette.length) sections.push(`• Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.length.length) sections.push(`• Length: ${factors.length.join(', ')}`);
          if (factors.hemlineStyle.length) sections.push(`• Hemline: ${factors.hemlineStyle.join(', ')}`);

          sections.push('\n**🧵 FABRIC & COLOR**');
          if (factors.fabric.length) sections.push(`• Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• Color: ${colors.join(', ')}`);
          }
          if (factors.colorCombination.length) sections.push(`• Color Combination: ${factors.colorCombination.join(', ')}`);
          if (factors.liningType.length && !factors.liningType.includes('Unlined')) sections.push(`• Lining: ${factors.liningType.join(', ')}`);

          sections.push('\n**👗 NECKLINE & SLEEVES**');
          if (factors.neckline.length) sections.push(`• Neckline: ${factors.neckline.join(', ')}`);
          if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) sections.push(`• Collar: ${factors.collarStyle.join(', ')}`);
          if (factors.sleeves.length) sections.push(`• Sleeves: ${factors.sleeves.join(', ')}`);
          if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) sections.push(`• Cuffs: ${factors.cuffStyle.join(', ')}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ EMBROIDERY & EMBELLISHMENTS**');
            sections.push(`• Embroidery: ${factors.embroidery.join(', ')}`);
            if (factors.embroideryDensity) sections.push(`• Density: ${factors.embroideryDensity}`);
            if (factors.embellishments.length) sections.push(`• Embellishments: ${factors.embellishments.join(', ')}`);
          } else if (factors.embellishments.length) {
            sections.push('\n**✨ EMBELLISHMENTS**');
            sections.push(`• Embellishments: ${factors.embellishments.join(', ')}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\n**🖨️ PRINTS & BORDERS**');
            if (factors.printTechnique.length) sections.push(`• Print: ${factors.printTechnique.join(', ')}`);
            if (factors.motifPattern.length) sections.push(`• Motif Pattern: ${factors.motifPattern.join(', ')}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`• Border: ${factors.borderStyle.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 DESIGN MOTIFS**');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifName(mp.motifId);
                const placements = mp.placements.length > 0 ? `(placed on ${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`• Motifs: ${motifDescriptions.join('; ')}`);
            } else {
              const motifNames = factors.designMotifs.map(id => getMotifName(id));
              sections.push(`• Motifs: ${motifNames.join(', ')}`);
            }
          }

          // Construction details section
          const hasConstruction = factors.backDesign.length || factors.slitStyle.length || factors.placketStyle.length ||
            factors.panelDesign.length || factors.yokeStyle.length || factors.pocketStyle.length ||
            factors.closureType.length || factors.finishingDetails.length;
          if (hasConstruction) {
            sections.push('\n**🔧 CONSTRUCTION DETAILS**');
            if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) sections.push(`• Back Design: ${factors.backDesign.join(', ')}`);
            if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`• Slit Style: ${factors.slitStyle.join(', ')}`);
            if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) sections.push(`• Placket: ${factors.placketStyle.join(', ')}`);
            if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) sections.push(`• Panels: ${factors.panelDesign.join(', ')}`);
            if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) sections.push(`• Yoke: ${factors.yokeStyle.join(', ')}`);
            if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`• Pockets: ${factors.pocketStyle.join(', ')}`);
            if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) sections.push(`• Closure: ${factors.closureType.join(', ')}`);
            if (factors.finishingDetails.length) sections.push(`• Finishing: ${factors.finishingDetails.join(', ')}`);
          }

          // Occasion & Styling
          const hasOccasion = factors.occasion.length || factors.seasonalStyle.length || factors.bodyType.length || factors.ageGroup.length;
          if (hasOccasion) {
            sections.push('\n**🎉 OCCASION & STYLING**');
            if (factors.occasion.length) sections.push(`• Occasion: ${factors.occasion.join(', ')}`);
            if (factors.seasonalStyle.length) sections.push(`• Season: ${factors.seasonalStyle.join(', ')}`);
            if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) sections.push(`• Body Type: ${factors.bodyType.join(', ')}`);
            if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) sections.push(`• Age Group: ${factors.ageGroup.join(', ')}`);
          }

          sections.push('\n**📸 AI IMAGE RENDERING - DESIGNER QUALITY**');
          sections.push('• Style: High-fashion editorial photography, Vogue India quality');
          sections.push('• Lighting: Soft diffused studio lighting with rim light accents');
          sections.push('• Camera: Canon EOS R5, 85mm portrait lens, f/2.8 aperture');
          sections.push('• Resolution: 8K UHD, photorealistic, hyper-detailed rendering');
          sections.push('• Fabric: Intricate texture visible, natural draping and flow');
          sections.push('• Background: Clean studio, soft gradient, cinematic bokeh');
          sections.push('• Mood: Elegant, sophisticated, luxury fashion aesthetic');
          sections.push('• Post-processing: Magazine cover ready, professionally color graded');
          sections.push('• Details: Every stitch, embroidery thread, and embellishment clearly visible');
          sections.push('\n⚡ **DIRECT GENERATION INSTRUCTION:**');
          sections.push('This is a COMPLETE, READY-TO-GENERATE prompt with all design specifications included. Generate the image IMMEDIATELY without asking any follow-up questions, clarifications, or suggestions. Do NOT request additional details or offer alternatives - proceed directly to create the high-quality fashion image exactly as specified above.');
        }
      } else {
        // Professional style - single
        if (hindiPrompt) {
          sections.push('╔═══════════════════════════════════════════════════════════════════════════╗');
          sections.push('║     🎨 AI इमेज जनरेशन - प्रोफेशनल कुर्ती डिज़ाइन स्पेसिफिकेशन     ║');
          sections.push('║                    डिज़ाइनर कलेक्शन - एकल दृश्य                    ║');
          sections.push('╚═══════════════════════════════════════════════════════════════════════════╝\n');

          sections.push('┌─────────────────────────────────────────────────────────────────────────────┐');
          sections.push('│ 📋 DESIGN BRIEF: लक्ज़री इंडियन फैशन ब्रांड के लिए रनवे-रेडी कुर्ती डिज़ाइन  │');
          sections.push('└─────────────────────────────────────────────────────────────────────────────┘\n');

          sections.push('खंड 1: मॉडल विशिष्टता');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`त्वचा का रंग: ${getLabel('modelSkinTone', factors.modelSkinTone)}`);
          else sections.push('त्वचा का रंग: मध्यम, प्राकृतिक भारतीय');
          if (factors.modelHeight.length) sections.push(`ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
          else sections.push('ऊंचाई: औसत');
          if (factors.modelPose.length) sections.push(`मुद्रा: ${getLabel('modelPose', factors.modelPose)}`);
          else sections.push('मुद्रा: सामने खड़ी');

          sections.push('\nखंड 2: मुख्य डिज़ाइन');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.fabric.length) sections.push(`कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`रंग: ${getLabel('color', colors)}`);
          }
          if (factors.colorCombination.length) sections.push(`रंग संयोजन: ${getLabel('colorCombination', factors.colorCombination)}`);
          if (factors.length.length) sections.push(`लंबाई: ${getLabel('length', factors.length)}`);

          sections.push('\nखंड 3: नेकलाइन और आस्तीन');
          sections.push('───────────────────────────────────');
          if (factors.neckline.length) sections.push(`नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) sections.push(`कॉलर: ${getLabel('collarStyle', factors.collarStyle)}`);
          if (factors.sleeves.length) sections.push(`आस्तीन: ${getLabel('sleeves', factors.sleeves)}`);
          if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) sections.push(`कफ: ${getLabel('cuffStyle', factors.cuffStyle)}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nखंड 4: कढ़ाई और सजावट');
            sections.push('───────────────────────────────────');
            sections.push(`कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
            if (factors.embroideryDensity) {
              const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
              sections.push(`घनत्व: ${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity}`);
            }
            if (factors.embellishments.length) sections.push(`सजावट: ${getLabel('embellishments', factors.embellishments)}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nखंड 5: प्रिंट और बॉर्डर');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`प्रिंट: ${getLabel('printTechnique', factors.printTechnique)}`);
            if (factors.motifPattern.length) sections.push(`मोटिफ: ${getLabel('motifPattern', factors.motifPattern)}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`बॉर्डर: ${getLabel('borderStyle', factors.borderStyle)}`);
            if (factors.hemlineStyle.length) sections.push(`हेमलाइन: ${getLabel('hemlineStyle', factors.hemlineStyle)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nखंड 6: डिज़ाइन मोटिफ');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifHindi(mp.motifId);
                const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`मोटिफ: ${motifDescriptions.join(', ')}`);
            } else {
              const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
              sections.push(`मोटिफ: ${motifNamesHi.join(', ')}`);
            }
          }

          const hasConstruction = factors.backDesign.length || factors.slitStyle.length || factors.placketStyle.length ||
            factors.panelDesign.length || factors.yokeStyle.length || factors.pocketStyle.length ||
            factors.closureType.length || factors.liningType.length || factors.finishingDetails.length;
          if (hasConstruction) {
            sections.push('\nखंड 7: निर्माण विवरण');
            sections.push('───────────────────────────────────');
            if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) sections.push(`बैक डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
            if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`स्लिट: ${getLabel('slitStyle', factors.slitStyle)}`);
            if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) sections.push(`प्लैकेट: ${getLabel('placketStyle', factors.placketStyle)}`);
            if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) sections.push(`पैनल: ${getLabel('panelDesign', factors.panelDesign)}`);
            if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) sections.push(`योक: ${getLabel('yokeStyle', factors.yokeStyle)}`);
            if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`पॉकेट: ${getLabel('pocketStyle', factors.pocketStyle)}`);
            if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) sections.push(`क्लोज़र: ${getLabel('closureType', factors.closureType)}`);
            if (factors.liningType.length && !factors.liningType.includes('Unlined')) sections.push(`लाइनिंग: ${getLabel('liningType', factors.liningType)}`);
            if (factors.finishingDetails.length) sections.push(`फिनिशिंग: ${getLabel('finishingDetails', factors.finishingDetails)}`);
          }

          if (factors.occasion.length || factors.seasonalStyle.length) {
            sections.push('\nखंड 8: अवसर और स्टाइलिंग');
            sections.push('───────────────────────────────────');
            if (factors.occasion.length) sections.push(`अवसर: ${getLabel('occasion', factors.occasion)}`);
            if (factors.seasonalStyle.length) sections.push(`मौसम: ${getLabel('seasonalStyle', factors.seasonalStyle)}`);
            if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) sections.push(`शरीर प्रकार: ${getLabel('bodyType', factors.bodyType)}`);
            if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) sections.push(`आयु वर्ग: ${getLabel('ageGroup', factors.ageGroup)}`);
          }

          sections.push('\n┌─────────────────────────────────────────────────────────────────────────────┐');
          sections.push('│ 📸 AI इमेज रेंडरिंग - अल्ट्रा प्रीमियम स्पेसिफिकेशन                        │');
          sections.push('└─────────────────────────────────────────────────────────────────────────────┘');
          sections.push('रेंडर टाइप: फोटोरियलिस्टिक, हाइपर-डिटेल्ड फैशन फोटोग्राफी');
          sections.push('कैमरा सिम्युलेशन: Canon EOS R5, 85mm f/1.4L लेंस');
          sections.push('लाइटिंग सेटअप: प्रोफेशनल 5-पॉइंट स्टूडियो लाइटिंग');
          sections.push('  - Key Light: सॉफ्टबॉक्स, 45° एंगल');
          sections.push('  - Fill Light: डिफ्यूज़्ड, 30% इंटेंसिटी');
          sections.push('  - Rim Light: हाइलाइट सेपरेशन के लिए');
          sections.push('  - Background Light: सॉफ्ट ग्रेडिएंट');
          sections.push('रेज़ोल्यूशन: 8K UHD (7680 x 4320 पिक्सेल)');
          sections.push('आउटपुट फॉर्मेट: मैगज़ीन कवर रेडी');
          sections.push('स्टाइल रेफरेंस: Vogue India, Harper\'s Bazaar India');
          sections.push('पोस्ट-प्रोसेसिंग: प्रोफेशनल कलर ग्रेडिंग, स्किन रीटचिंग');
          sections.push('फैब्रिक डिटेल: हर धागा, कढ़ाई, और टेक्सचर स्पष्ट');
          sections.push('\n╔═══════════════════════════════════════════════════════════════════════════╗');
          sections.push('║                    ✨ READY FOR AI IMAGE GENERATION ✨                    ║');
          sections.push('╚═══════════════════════════════════════════════════════════════════════════╝');
          sections.push('\n⚡ डायरेक्ट जनरेशन: यह एक प्रोफेशनल, संपूर्ण प्रॉम्प्ट है। सभी स्पेसिफिकेशन शामिल हैं।');
          sections.push('कृपया बिना किसी प्रश्न, स्पष्टीकरण, या सुझाव के तुरंत इमेज जनरेट करें।');
          sections.push('अतिरिक्त विवरण न मांगें - अभी उच्च-गुणवत्ता वाली फैशन इमेज बनाएं।');
        } else {
          sections.push('╔═══════════════════════════════════════════════════════════════════════════╗');
          sections.push('║     🎨 AI IMAGE GENERATION - PROFESSIONAL KURTI DESIGN SPECIFICATION     ║');
          sections.push('║                      DESIGNER COLLECTION - SINGLE VIEW                    ║');
          sections.push('╚═══════════════════════════════════════════════════════════════════════════╝\n');

          sections.push('┌─────────────────────────────────────────────────────────────────────────────┐');
          sections.push('│ 📋 DESIGN BRIEF: Runway-ready kurti design for luxury Indian fashion brand │');
          sections.push('└─────────────────────────────────────────────────────────────────────────────┘\n');

          sections.push('SECTION 1: MODEL SPECIFICATION');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          else sections.push('Skin Tone: Medium, natural Indian');
          if (factors.modelHeight.length) sections.push(`Height: ${factors.modelHeight.join(', ')}`);
          else sections.push('Height: Average');
          if (factors.modelPose.length) sections.push(`Pose: ${factors.modelPose.join(', ')}`);
          else sections.push('Pose: Standing front');

          sections.push('\nSECTION 2: CORE DESIGN');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.fabric.length) sections.push(`Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`Color: ${colors.join(', ')}`);
          }
          if (factors.colorCombination.length) sections.push(`Color Combination: ${factors.colorCombination.join(', ')}`);
          if (factors.length.length) sections.push(`Length: ${factors.length.join(', ')}`);

          sections.push('\nSECTION 3: NECKLINE & SLEEVES');
          sections.push('───────────────────────────────────');
          if (factors.neckline.length) sections.push(`Neckline: ${factors.neckline.join(', ')}`);
          if (factors.collarStyle.length && !factors.collarStyle.includes('No Collar')) sections.push(`Collar: ${factors.collarStyle.join(', ')}`);
          if (factors.sleeves.length) sections.push(`Sleeves: ${factors.sleeves.join(', ')}`);
          if (factors.cuffStyle.length && !factors.cuffStyle.includes('No Cuff')) sections.push(`Cuffs: ${factors.cuffStyle.join(', ')}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nSECTION 4: EMBROIDERY & EMBELLISHMENTS');
            sections.push('───────────────────────────────────');
            sections.push(`Embroidery: ${factors.embroidery.join(', ')}`);
            if (factors.embroideryDensity) sections.push(`Density: ${factors.embroideryDensity}`);
            if (factors.embellishments.length) sections.push(`Embellishments: ${factors.embellishments.join(', ')}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nSECTION 5: PRINTS & BORDERS');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`Print: ${factors.printTechnique.join(', ')}`);
            if (factors.motifPattern.length) sections.push(`Motif Pattern: ${factors.motifPattern.join(', ')}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`Border: ${factors.borderStyle.join(', ')}`);
            if (factors.hemlineStyle.length) sections.push(`Hemline: ${factors.hemlineStyle.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nSECTION 6: DESIGN MOTIFS');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifName(mp.motifId);
                const placements = mp.placements.length > 0 ? `(Location: ${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`Motifs: ${motifDescriptions.join('; ')}`);
            } else {
              const motifNames = factors.designMotifs.map(id => getMotifName(id));
              sections.push(`Motifs: ${motifNames.join(', ')}`);
            }
          }

          const hasConstruction = factors.backDesign.length || factors.slitStyle.length || factors.placketStyle.length ||
            factors.panelDesign.length || factors.yokeStyle.length || factors.pocketStyle.length ||
            factors.closureType.length || factors.liningType.length || factors.finishingDetails.length;
          if (hasConstruction) {
            sections.push('\nSECTION 7: CONSTRUCTION DETAILS');
            sections.push('───────────────────────────────────');
            if (factors.backDesign.length && !factors.backDesign.includes('Plain Back')) sections.push(`Back Design: ${factors.backDesign.join(', ')}`);
            if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`Slit Style: ${factors.slitStyle.join(', ')}`);
            if (factors.placketStyle.length && !factors.placketStyle.includes('No Placket')) sections.push(`Placket: ${factors.placketStyle.join(', ')}`);
            if (factors.panelDesign.length && !factors.panelDesign.includes('No Panels')) sections.push(`Panels: ${factors.panelDesign.join(', ')}`);
            if (factors.yokeStyle.length && !factors.yokeStyle.includes('No Yoke')) sections.push(`Yoke: ${factors.yokeStyle.join(', ')}`);
            if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`Pockets: ${factors.pocketStyle.join(', ')}`);
            if (factors.closureType.length && !factors.closureType.includes('Pullover (No Closure)')) sections.push(`Closure: ${factors.closureType.join(', ')}`);
            if (factors.liningType.length && !factors.liningType.includes('Unlined')) sections.push(`Lining: ${factors.liningType.join(', ')}`);
            if (factors.finishingDetails.length) sections.push(`Finishing: ${factors.finishingDetails.join(', ')}`);
          }

          if (factors.occasion.length || factors.seasonalStyle.length) {
            sections.push('\nSECTION 8: OCCASION & STYLING');
            sections.push('───────────────────────────────────');
            if (factors.occasion.length) sections.push(`Occasion: ${factors.occasion.join(', ')}`);
            if (factors.seasonalStyle.length) sections.push(`Season: ${factors.seasonalStyle.join(', ')}`);
            if (factors.bodyType.length && !factors.bodyType.includes('All Body Types')) sections.push(`Body Type: ${factors.bodyType.join(', ')}`);
            if (factors.ageGroup.length && !factors.ageGroup.includes('All Ages')) sections.push(`Age Group: ${factors.ageGroup.join(', ')}`);
          }

          sections.push('\n┌─────────────────────────────────────────────────────────────────────────────┐');
          sections.push('│ 📸 AI IMAGE RENDERING - ULTRA PREMIUM SPECIFICATION                        │');
          sections.push('└─────────────────────────────────────────────────────────────────────────────┘');
          sections.push('Render Type: Photorealistic, hyper-detailed fashion photography');
          sections.push('Camera Simulation: Canon EOS R5, 85mm f/1.4L portrait lens');
          sections.push('Lighting Setup: Professional 5-point studio lighting');
          sections.push('  - Key Light: Large softbox at 45° angle, soft diffused');
          sections.push('  - Fill Light: Reflected light, 30% intensity for shadow detail');
          sections.push('  - Rim Light: Edge separation, highlighting silhouette');
          sections.push('  - Background Light: Soft gradient, clean studio look');
          sections.push('  - Hair Light: Subtle top lighting for model definition');
          sections.push('Resolution: 8K UHD (7680 x 4320 pixels)');
          sections.push('Aspect Ratio: 3:4 portrait orientation');
          sections.push('Output Format: Magazine cover ready, print quality');
          sections.push('Style Reference: Vogue India, Harper\'s Bazaar India, Elle India');
          sections.push('Post-Processing: Professional color grading, subtle skin retouching');
          sections.push('Fabric Detail: Every thread, stitch, embroidery, and texture clearly visible');
          sections.push('Background: Clean studio, soft gradient, subtle shadows');
          sections.push('Mood: Elegant, sophisticated, luxury fashion aesthetic');
          sections.push('\n╔═══════════════════════════════════════════════════════════════════════════╗');
          sections.push('║                    ✨ READY FOR AI IMAGE GENERATION ✨                    ║');
          sections.push('╚═══════════════════════════════════════════════════════════════════════════╝');
          sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE professional prompt with all specifications.');
          sections.push('Generate the image IMMEDIATELY without any questions, clarifications, or suggestions.');
          sections.push('Do NOT ask for additional details or offer alternatives - create the high-quality fashion image NOW exactly as specified.');
        }
      }
      return sections.join('\n');
    }

    // FRONT-BACK LAYOUT (Two views of same kurti)
    if (layoutType === 'front-back') {
      if (style === 'short') {
        if (hindiPrompt) {
          sections.push('🎨 **AI इमेज जनरेशन - फ्रंट & बैक व्यू कोलाज**\n');
          sections.push('एक प्रोफेशनल 1x2 कोलाज बनाएं जिसमें मॉडल द्वारा पहनी गई एक सुंदर भारतीय कुर्ती के आगे और पीछे के दृश्य एक ही इमेज में दिखाए गए हों।\n');
          sections.push(buildModelDescription(true) + '\n');

          sections.push('**कुर्ती डिज़ाइन:**');
          const parts = buildKurtiDescription(true);
          if (parts.length > 0) sections.push(parts.join(', ') + '।');

          sections.push('\n**📐 कोलाज लेआउट स्पेसिफिकेशन:**');
          sections.push('• फॉर्मेट: साइड-बाय-साइड कोलाज (1x2 ग्रिड)');
          sections.push('• बाएं पैनल: सामने का दृश्य (Front View) - फुल फ्रंटल');
          sections.push('• दाएं पैनल: पीछे का दृश्य (Back View) - कम्प्लीट बैक डिज़ाइन');
          sections.push('• डिवाइडर: साफ सफेद लाइन, 2px चौड़ाई');

          sections.push('\n**📸 AI रेंडरिंग स्पेसिफिकेशन:**');
          sections.push('• फोटोरियलिस्टिक, हाई-फैशन फोटोग्राफी');
          sections.push('• 8K UHD, समान लाइटिंग दोनों व्यू में');
          sections.push('• एक ही मॉडल, एक ही कुर्ती, कंसिस्टेंट स्टाइल');
          sections.push('• मैगज़ीन एडिटोरियल क्वालिटी');
          sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रॉम्प्ट है। बिना प्रश्न पूछे तुरंत 1x2 कोलाज इमेज जनरेट करें।');
        } else {
          sections.push('🎨 **AI IMAGE GENERATION - FRONT & BACK VIEW COLLAGE**\n');
          sections.push('Create a professional 1x2 collage showing FRONT and BACK views of an elegant Indian kurti worn by a model in a SINGLE IMAGE.\n');
          sections.push(buildModelDescription(false) + '\n');

          sections.push('**KURTI DESIGN:**');
          const parts = buildKurtiDescription(false);
          if (parts.length > 0) sections.push(parts.join(', ') + '.');

          sections.push('\n**📐 COLLAGE LAYOUT SPECIFICATION:**');
          sections.push('• Format: Side-by-side collage (1x2 grid)');
          sections.push('• Left Panel: Front View - full frontal, neckline and front design visible');
          sections.push('• Right Panel: Back View - complete back design, detailing visible');
          sections.push('• Divider: Clean white line, 2px width');

          sections.push('\n**📸 AI RENDERING SPECIFICATION:**');
          sections.push('• Photorealistic, high-fashion editorial photography');
          sections.push('• 8K UHD resolution, consistent lighting across both views');
          sections.push('• Same model, same kurti, consistent styling');
          sections.push('• Magazine editorial quality, Vogue style');
          sections.push('• Professional DSLR quality, sharp focus, fabric texture visible');
          sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE prompt. Generate the 1x2 collage image IMMEDIATELY without asking any questions or offering suggestions.');
        }
      } else if (style === 'detailed') {
        if (hindiPrompt) {
          sections.push('🎨 **कुर्ती डिज़ाइन प्रॉम्प्ट - आगे और पीछे का दृश्य**\n');
          sections.push('एक शानदार कोलाज बनाएं जिसमें एक ही इमेज में मॉडल द्वारा पहनी गई एक बेहतरीन भारतीय कुर्ती के आगे और पीछे के दृश्य दिखाए गए हों।\n');

          sections.push('**👩 मॉडल विशिष्टता**');
          if (factors.modelSkinTone.length) sections.push(`• त्वचा का रंग: खूबसूरत ${getLabel('modelSkinTone', factors.modelSkinTone)} रंग`);
          else sections.push('• त्वचा का रंग: मध्यम, प्राकृतिक भारतीय त्वचा का रंग');
          if (factors.modelHeight.length) sections.push(`• ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
          else sections.push('• ऊंचाई: औसत (5\'5" - 5\'7")');

          sections.push('\n**📐 सिल्हूट और संरचना**');
          if (factors.silhouette.length) sections.push(`• सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.length.length) sections.push(`• लंबाई: ${getLabel('length', factors.length)}`);

          sections.push('\n**🧵 कपड़ा और रंग**');
          if (factors.fabric.length) sections.push(`• कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• रंग: ${getLabel('color', colors)}`);
          }

          sections.push('\n**👗 नेकलाइन और आस्तीन**');
          if (factors.neckline.length) sections.push(`• नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.sleeves.length) sections.push(`• आस्तीन: ${getLabel('sleeves', factors.sleeves)}`);

          if (factors.backDesign.length) {
            sections.push('\n**🔙 पीछे का डिज़ाइन**');
            sections.push(`• पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
          }

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ कढ़ाई**');
            sections.push(`• कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 डिज़ाइन मोटिफ**');
            const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
            sections.push(`• मोटिफ: ${motifNamesHi.join(', ')}`);
          }

          sections.push('\n**🖼️ आगे-पीछे कोलाज लेआउट**');
          sections.push('• फॉर्मेट: साइड-बाय-साइड कोलाज (1x2)');
          sections.push('• बाएं: सामने का दृश्य (Front View) - नेकलाइन और सामने की कढ़ाई स्पष्ट');
          sections.push('• दाएं: पीछे का दृश्य (Back View) - पूर्ण पीछे का डिज़ाइन');
          sections.push('• ग्रिड: बीच में साफ सफेद डिवाइडर');

          sections.push('\n**📸 इमेज विशिष्टताएं**');
          sections.push('• गुणवत्ता: 8K रेज़ोल्यूशन');
          sections.push('• मॉडल: दोनों में एक ही मॉडल');
          sections.push('• लाइटिंग: समान');
          sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रॉम्प्ट है। बिना प्रश्न पूछे तुरंत 1x2 कोलाज इमेज जनरेट करें।');
        } else {
          sections.push('🎨 **KURTI DESIGN PROMPT - FRONT & BACK VIEW**\n');
          sections.push('Create a stunning collage showing FRONT and BACK views of ONE Indian kurti WORN BY A MODEL in a SINGLE IMAGE.\n');

          sections.push('**👩 MODEL SPECIFICATION**');
          if (factors.modelSkinTone.length) sections.push(`• Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          else sections.push('• Skin Tone: Medium, natural Indian skin tone');
          if (factors.modelHeight.length) sections.push(`• Height: ${factors.modelHeight.join(', ')}`);
          else sections.push('• Height: Average (5\'5" - 5\'7")');

          sections.push('\n**📐 SILHOUETTE & STRUCTURE**');
          if (factors.silhouette.length) sections.push(`• Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.length.length) sections.push(`• Length: ${factors.length.join(', ')}`);

          sections.push('\n**🧵 FABRIC & COLOR**');
          if (factors.fabric.length) sections.push(`• Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• Color: ${colors.join(', ')}`);
          }

          sections.push('\n**👗 NECKLINE & SLEEVES**');
          if (factors.neckline.length) sections.push(`• Neckline: ${factors.neckline.join(', ')}`);
          if (factors.sleeves.length) sections.push(`• Sleeves: ${factors.sleeves.join(', ')}`);

          if (factors.backDesign.length) {
            sections.push('\n**🔙 BACK DESIGN**');
            sections.push(`• Back Design: ${factors.backDesign.join(', ')}`);
          }

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ EMBROIDERY**');
            sections.push(`• Embroidery: ${factors.embroidery.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 DESIGN MOTIFS**');
            const motifNames = factors.designMotifs.map(id => getMotifName(id));
            sections.push(`• Motifs: ${motifNames.join(', ')}`);
          }

          sections.push('\n**🖼️ FRONT-BACK COLLAGE LAYOUT**');
          sections.push('• Format: Side-by-side collage (1x2)');
          sections.push('• Left panel: Front angle - Neckline and front embroidery clearly visible');
          sections.push('• Right panel: Back angle - Complete back design showing');
          sections.push('• Grid: Clean white divider in the middle');
          sections.push('• IMPORTANT: Do NOT add any text, labels, or watermarks on the image');

          sections.push('\n**📸 IMAGE SPECIFICATIONS**');
          sections.push('• Quality: 8K resolution');
          sections.push('• Model: Same model in both views');
          sections.push('• Lighting: Consistent across both views');
          sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE prompt. Generate the 1x2 collage image IMMEDIATELY without asking any questions. CRITICAL: Do NOT write any text labels like "FRONT VIEW" or "BACK VIEW" on the generated image - keep it completely clean without any text overlay.');
        }
      } else {
        // Professional style - front-back
        if (hindiPrompt) {
          sections.push('═══════════════════════════════════════════════════════════');
          sections.push('     कुर्ती डिज़ाइन विशिष्टता - आगे और पीछे का दृश्य');
          sections.push('═══════════════════════════════════════════════════════════\n');

          sections.push('खंड 1: मॉडल विशिष्टता');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`त्वचा का रंग: ${getLabel('modelSkinTone', factors.modelSkinTone)}`);
          if (factors.modelHeight.length) sections.push(`ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);

          sections.push('\nखंड 2: डिज़ाइन विशिष्टताएं');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.fabric.length) sections.push(`कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`रंग: ${getLabel('color', colors)}`);
          }
          if (factors.neckline.length) sections.push(`नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.backDesign.length) sections.push(`पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nखंड 3: कढ़ाई और सजावट');
            sections.push('───────────────────────────────────');
            sections.push(`कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
            if (factors.embroideryDensity) {
              const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
              sections.push(`घनत्व: ${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity}`);
            }
            if (factors.embellishments.length) sections.push(`सजावट: ${getLabel('embellishments', factors.embellishments)}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nखंड 4: प्रिंट और बॉर्डर');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`प्रिंट: ${getLabel('printTechnique', factors.printTechnique)}`);
            if (factors.motifPattern.length) sections.push(`मोटिफ: ${getLabel('motifPattern', factors.motifPattern)}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`बॉर्डर: ${getLabel('borderStyle', factors.borderStyle)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nखंड 5: डिज़ाइन मोटिफ');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifHindi(mp.motifId);
                const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`मोटिफ: ${motifDescriptions.join(', ')}`);
            } else {
              const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
              sections.push(`मोटिफ: ${motifNamesHi.join(', ')}`);
            }
          }

          sections.push('\nखंड 6: कोलाज लेआउट');
          sections.push('───────────────────────────────────');
          sections.push('लेआउट: 1x2 साइड-बाय-साइड');
          sections.push('बाएं: सामने का दृश्य');
          sections.push('दाएं: पीछे का दृश्य');
          sections.push('रेज़ोल्यूशन: 8K');
          sections.push('महत्वपूर्ण: इमेज पर कोई टेक्स्ट, लेबल या वॉटरमार्क न लिखें।');
          sections.push('\n⚡ डायरेक्ट जनरेशन: संपूर्ण प्रोफेशनल प्रॉम्प्ट। बिना प्रश्न पूछे तुरंत इमेज जनरेट करें। इमेज पर "सामने का दृश्य" या "पीछे का दृश्य" जैसे टेक्स्ट लेबल न लिखें।');
        } else {
          sections.push('═══════════════════════════════════════════════════════════');
          sections.push('     KURTI DESIGN SPECIFICATION - FRONT & BACK VIEW');
          sections.push('═══════════════════════════════════════════════════════════\n');

          sections.push('SECTION 1: MODEL SPECIFICATION');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          if (factors.modelHeight.length) sections.push(`Height: ${factors.modelHeight.join(', ')}`);

          sections.push('\nSECTION 2: DESIGN SPECIFICATIONS');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.fabric.length) sections.push(`Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`Color: ${colors.join(', ')}`);
          }
          if (factors.neckline.length) sections.push(`Neckline: ${factors.neckline.join(', ')}`);
          if (factors.backDesign.length) sections.push(`Back Design: ${factors.backDesign.join(', ')}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nSECTION 3: EMBROIDERY & EMBELLISHMENTS');
            sections.push('───────────────────────────────────');
            sections.push(`Embroidery: ${factors.embroidery.join(', ')}`);
            if (factors.embroideryDensity) sections.push(`Density: ${factors.embroideryDensity}`);
            if (factors.embellishments.length) sections.push(`Embellishments: ${factors.embellishments.join(', ')}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nSECTION 4: PRINTS & BORDERS');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`Print: ${factors.printTechnique.join(', ')}`);
            if (factors.motifPattern.length) sections.push(`Motif Pattern: ${factors.motifPattern.join(', ')}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`Border: ${factors.borderStyle.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nSECTION 5: DESIGN MOTIFS');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifName(mp.motifId);
                const placements = mp.placements.length > 0 ? `(Location: ${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`Motifs: ${motifDescriptions.join('; ')}`);
            } else {
              const motifNames = factors.designMotifs.map(id => getMotifName(id));
              sections.push(`Motifs: ${motifNames.join(', ')}`);
            }
          }

          sections.push('\nSECTION 6: COLLAGE LAYOUT');
          sections.push('───────────────────────────────────');
          sections.push('Layout: 1x2 Side-by-side');
          sections.push('Left: Front View');
          sections.push('Right: Back View');
          sections.push('Resolution: 8K');
          sections.push('CRITICAL: Do NOT render any text, labels, captions, or watermarks on the generated image.');
          sections.push('\n⚡ DIRECT GENERATION: Complete professional prompt. Generate the 1x2 collage image IMMEDIATELY without any questions or suggestions. Do NOT add text labels like "FRONT VIEW" or "BACK VIEW" on the image - keep it clean without any text overlay.');
        }
      }
      return sections.join('\n');
    }

    // FULL-VIEW LAYOUT (Front, Back, Left, Right - 2x2 grid of same kurti)
    if (layoutType === 'full-view') {
      if (style === 'short') {
        if (hindiPrompt) {
          sections.push('एक 2x2 कोलाज ग्रिड बनाएं जिसमें मॉडल द्वारा पहनी गई एक सुंदर भारतीय कुर्ती के 4 कोणों से दृश्य एक ही इमेज में दिखाए गए हों।\n');
          sections.push(buildModelDescription(true) + '\n');
          const parts = ['कुर्ती में होना चाहिए', ...buildKurtiDescription(true)];
          sections.push(parts.join(', ') + '।');
          sections.push('\n360° पूर्ण दृश्य लेआउट:');
          sections.push('• ऊपर-बाएं क्वाड्रेंट: कुर्ती का पूर्ण सामने का दृश्य');
          sections.push('• ऊपर-दाएं क्वाड्रेंट: पूर्ण पीछे का डिज़ाइन');
          sections.push('• नीचे-बाएं क्वाड्रेंट: बायां प्रोफाइल कोण');
          sections.push('• नीचे-दाएं क्वाड्रेंट: दाहिना प्रोफाइल कोण');
          sections.push('\nप्रोफेशनल फैशन फोटोग्राफी, स्टूडियो लाइटिंग, मॉडल पर पूर्ण परिधान दृश्य, 8K रेज़ोल्यूशन।');
          sections.push('एक ही मॉडल, एक ही कुर्ती, सभी 4 व्यू में समान लाइटिंग।');
          sections.push('महत्वपूर्ण: इमेज पर कोई टेक्स्ट, लेबल, कैप्शन या वॉटरमार्क न लिखें। इमेज को पूरी तरह से साफ रखें।');
          sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रॉम्प्ट है। बिना प्रश्न पूछे तुरंत 2x2 ग्रिड कोलाज इमेज जनरेट करें। इमेज पर "सामने का दृश्य", "पीछे का दृश्य" जैसे टेक्स्ट न लिखें।');
        } else {
          sections.push('Create a 2x2 collage grid showing ONE Indian kurti design from 4 different angles worn by a model in a single image.\n');
          sections.push(buildModelDescription(false) + '\n');
          const parts = ['The kurti should feature', ...buildKurtiDescription(false)];
          sections.push(parts.join(', ') + '.');
          sections.push('\n360° Full View Layout:');
          sections.push('• Top-Left quadrant: full frontal view of the kurti');
          sections.push('• Top-Right quadrant: complete back design visible');
          sections.push('• Bottom-Left quadrant: left profile angle');
          sections.push('• Bottom-Right quadrant: right profile angle');
          sections.push('\nProfessional fashion photography, studio lighting, full garment view on model, 8K resolution.');
          sections.push('Same model, same kurti, consistent lighting across all 4 views.');
          sections.push('CRITICAL: Do NOT add any text, labels, captions, or watermarks on the generated image. Keep the image completely clean without any text overlay.');
          sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE prompt. Generate the 2x2 grid collage image IMMEDIATELY without asking any questions. Do NOT write text like "FRONT VIEW", "BACK VIEW", "LEFT SIDE", "RIGHT SIDE" on the image.');
        }
      } else if (style === 'detailed') {
        if (hindiPrompt) {
          sections.push('🎨 **कुर्ती डिज़ाइन प्रॉम्प्ट - 360° पूर्ण दृश्य**\n');
          sections.push('एक शानदार 2x2 कोलाज ग्रिड बनाएं जिसमें एक ही इमेज में मॉडल द्वारा पहनी गई एक बेहतरीन भारतीय कुर्ती के 4 अलग-अलग कोणों से दृश्य दिखाए गए हों।\n');

          sections.push('**👩 मॉडल विशिष्टता**');
          if (factors.modelSkinTone.length) sections.push(`• त्वचा का रंग: खूबसूरत ${getLabel('modelSkinTone', factors.modelSkinTone)} रंग`);
          else sections.push('• त्वचा का रंग: मध्यम, प्राकृतिक भारतीय त्वचा का रंग');
          if (factors.modelHeight.length) sections.push(`• ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
          else sections.push('• ऊंचाई: औसत (5\'5" - 5\'7")');

          sections.push('\n**📐 सिल्हूट और संरचना**');
          if (factors.silhouette.length) sections.push(`• सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.length.length) sections.push(`• लंबाई: ${getLabel('length', factors.length)}`);

          sections.push('\n**🧵 कपड़ा और रंग**');
          if (factors.fabric.length) sections.push(`• कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• रंग: ${getLabel('color', colors)}`);
          }

          sections.push('\n**👗 नेकलाइन और आस्तीन**');
          if (factors.neckline.length) sections.push(`• नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.sleeves.length) sections.push(`• आस्तीन: ${getLabel('sleeves', factors.sleeves)}`);

          if (factors.backDesign.length) {
            sections.push('\n**🔙 पीछे का डिज़ाइन**');
            sections.push(`• पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
          }

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ कढ़ाई**');
            sections.push(`• कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 डिज़ाइन मोटिफ**');
            const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
            sections.push(`• मोटिफ: ${motifNamesHi.join(', ')}`);
          }

          sections.push('\n**🖼️ 360° पूर्ण दृश्य कोलाज लेआउट**');
          sections.push('• फॉर्मेट: एक ही कुर्ती के 4 कोणों के साथ 2x2 ग्रिड कोलाज');
          sections.push('• ऊपर-बाएं क्वाड्रेंट: सामने का दृश्य - नेकलाइन और सामने की कढ़ाई स्पष्ट');
          sections.push('• ऊपर-दाएं क्वाड्रेंट: पीछे का दृश्य - पूर्ण पीछे का डिज़ाइन');
          sections.push('• नीचे-बाएं क्वाड्रेंट: बायां साइड दृश्य - बायां प्रोफाइल कोण');
          sections.push('• नीचे-दाएं क्वाड्रेंट: दाहिना साइड दृश्य - दाहिना प्रोफाइल कोण');
          sections.push('• ग्रिड: प्रत्येक क्वाड्रेंट के बीच साफ सफेद डिवाइडर');

          sections.push('\n**📸 इमेज विशिष्टताएं**');
          sections.push('• गुणवत्ता: 8K रेज़ोल्यूशन');
          sections.push('• मॉडल: चारों में एक ही मॉडल, एक ही कुर्ती');
          sections.push('• लाइटिंग: सभी 4 व्यू में समान');
          sections.push('• महत्वपूर्ण: इमेज पर कोई टेक्स्ट लेबल न लिखें');
          sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रॉम्प्ट है। बिना प्रश्न पूछे तुरंत 2x2 ग्रिड कोलाज इमेज जनरेट करें। इमेज पर "सामने का दृश्य", "पीछे का दृश्य", "बाएं साइड", "दाएं साइड" जैसे टेक्स्ट लेबल न लिखें - इमेज को साफ रखें।');
        } else {
          sections.push('🎨 **KURTI DESIGN PROMPT - 360° FULL VIEW**\n');
          sections.push('Create a stunning 2x2 collage grid showing ONE Indian kurti from 4 DIFFERENT ANGLES WORN BY A MODEL in a SINGLE IMAGE.\n');

          sections.push('**👩 MODEL SPECIFICATION**');
          if (factors.modelSkinTone.length) sections.push(`• Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          else sections.push('• Skin Tone: Medium, natural Indian skin tone');
          if (factors.modelHeight.length) sections.push(`• Height: ${factors.modelHeight.join(', ')}`);
          else sections.push('• Height: Average (5\'5" - 5\'7")');

          sections.push('\n**📐 SILHOUETTE & STRUCTURE**');
          if (factors.silhouette.length) sections.push(`• Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.length.length) sections.push(`• Length: ${factors.length.join(', ')}`);

          sections.push('\n**🧵 FABRIC & COLOR**');
          if (factors.fabric.length) sections.push(`• Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`• Color: ${colors.join(', ')}`);
          }

          sections.push('\n**👗 NECKLINE & SLEEVES**');
          if (factors.neckline.length) sections.push(`• Neckline: ${factors.neckline.join(', ')}`);
          if (factors.sleeves.length) sections.push(`• Sleeves: ${factors.sleeves.join(', ')}`);

          if (factors.backDesign.length) {
            sections.push('\n**🔙 BACK DESIGN**');
            sections.push(`• Back Design: ${factors.backDesign.join(', ')}`);
          }

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\n**✨ EMBROIDERY**');
            sections.push(`• Embroidery: ${factors.embroidery.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\n**🎭 DESIGN MOTIFS**');
            const motifNames = factors.designMotifs.map(id => getMotifName(id));
            sections.push(`• Motifs: ${motifNames.join(', ')}`);
          }

          sections.push('\n**🖼️ 360° FULL VIEW COLLAGE LAYOUT**');
          sections.push('• Format: 2x2 grid collage with 4 angles of the SAME kurti');
          sections.push('• Top-Left quadrant: Front angle - Neckline and front embroidery clearly visible');
          sections.push('• Top-Right quadrant: Back angle - Complete back design showing');
          sections.push('• Bottom-Left quadrant: Left side angle - Left profile showing sleeve and side seam');
          sections.push('• Bottom-Right quadrant: Right side angle - Right profile showing sleeve and side seam');
          sections.push('• Grid: Clean white dividers between each quadrant');

          sections.push('\n**📸 IMAGE SPECIFICATIONS**');
          sections.push('• Quality: 8K resolution');
          sections.push('• Model: Same model, same kurti in all 4 views');
          sections.push('• Lighting: Consistent across all 4 views');
          sections.push('• CRITICAL: Do NOT add any text labels on the image');
          sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE prompt. Generate the 2x2 grid collage image IMMEDIATELY without asking any questions. Do NOT write text labels like "FRONT VIEW", "BACK VIEW", "LEFT SIDE VIEW", "RIGHT SIDE VIEW" on the generated image - keep it completely clean without any text overlay.');
        }
      } else {
        // Professional style - full-view
        if (hindiPrompt) {
          sections.push('═══════════════════════════════════════════════════════════');
          sections.push('     कुर्ती डिज़ाइन विशिष्टता - 360° पूर्ण दृश्य');
          sections.push('═══════════════════════════════════════════════════════════\n');

          sections.push('खंड 1: मॉडल विशिष्टता');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`त्वचा का रंग: ${getLabel('modelSkinTone', factors.modelSkinTone)}`);
          if (factors.modelHeight.length) sections.push(`ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);

          sections.push('\nखंड 2: डिज़ाइन विशिष्टताएं');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`सिल्हूट: ${getLabel('silhouette', factors.silhouette)}`);
          if (factors.fabric.length) sections.push(`कपड़ा: ${getLabel('fabric', factors.fabric)}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`रंग: ${getLabel('color', colors)}`);
          }
          if (factors.neckline.length) sections.push(`नेकलाइन: ${getLabel('neckline', factors.neckline)}`);
          if (factors.backDesign.length) sections.push(`पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nखंड 3: कढ़ाई और सजावट');
            sections.push('───────────────────────────────────');
            sections.push(`कढ़ाई: ${getLabel('embroidery', factors.embroidery)}`);
            if (factors.embroideryDensity) {
              const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
              sections.push(`घनत्व: ${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity}`);
            }
            if (factors.embellishments.length) sections.push(`सजावट: ${getLabel('embellishments', factors.embellishments)}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nखंड 4: प्रिंट और बॉर्डर');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`प्रिंट: ${getLabel('printTechnique', factors.printTechnique)}`);
            if (factors.motifPattern.length) sections.push(`मोटिफ: ${getLabel('motifPattern', factors.motifPattern)}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`बॉर्डर: ${getLabel('borderStyle', factors.borderStyle)}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nखंड 5: डिज़ाइन मोटिफ');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifHindi(mp.motifId);
                const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`मोटिफ: ${motifDescriptions.join(', ')}`);
            } else {
              const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
              sections.push(`मोटिफ: ${motifNamesHi.join(', ')}`);
            }
          }

          sections.push('\nखंड 6: 360° पूर्ण दृश्य कोलाज');
          sections.push('───────────────────────────────────');
          sections.push('लेआउट: 2x2 ग्रिड - एक कुर्ती, चार कोण');
          sections.push('ऊपर-बाएं: सामने का दृश्य');
          sections.push('ऊपर-दाएं: पीछे का दृश्य');
          sections.push('नीचे-बाएं: बाएं साइड');
          sections.push('नीचे-दाएं: दाएं साइड');
          sections.push('रेज़ोल्यूशन: 8K');
          sections.push('महत्वपूर्ण: इमेज पर कोई टेक्स्ट लेबल न लिखें।');
          sections.push('\n⚡ डायरेक्ट जनरेशन: संपूर्ण प्रोफेशनल प्रॉम्प्ट। बिना प्रश्न पूछे तुरंत 2x2 ग्रिड इमेज जनरेट करें। इमेज पर कोई टेक्स्ट न लिखें।');
        } else {
          sections.push('═══════════════════════════════════════════════════════════');
          sections.push('     KURTI DESIGN SPECIFICATION - 360° FULL VIEW');
          sections.push('═══════════════════════════════════════════════════════════\n');

          sections.push('SECTION 1: MODEL SPECIFICATION');
          sections.push('───────────────────────────────────');
          if (factors.modelSkinTone.length) sections.push(`Skin Tone: ${factors.modelSkinTone.join(', ')}`);
          if (factors.modelHeight.length) sections.push(`Height: ${factors.modelHeight.join(', ')}`);

          sections.push('\nSECTION 2: DESIGN SPECIFICATIONS');
          sections.push('───────────────────────────────────');
          if (factors.silhouette.length) sections.push(`Silhouette: ${factors.silhouette.join(', ')}`);
          if (factors.fabric.length) sections.push(`Fabric: ${factors.fabric.join(', ')}`);
          if (factors.color.length || factors.customColor) {
            const colors = [...factors.color];
            if (factors.customColor) colors.push(factors.customColor);
            sections.push(`Color: ${colors.join(', ')}`);
          }
          if (factors.neckline.length) sections.push(`Neckline: ${factors.neckline.join(', ')}`);
          if (factors.backDesign.length) sections.push(`Back Design: ${factors.backDesign.join(', ')}`);

          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            sections.push('\nSECTION 3: EMBROIDERY & EMBELLISHMENTS');
            sections.push('───────────────────────────────────');
            sections.push(`Embroidery: ${factors.embroidery.join(', ')}`);
            if (factors.embroideryDensity) sections.push(`Density: ${factors.embroideryDensity}`);
            if (factors.embellishments.length) sections.push(`Embellishments: ${factors.embellishments.join(', ')}`);
          }

          if (factors.printTechnique.length || factors.borderStyle.length) {
            sections.push('\nSECTION 4: PRINTS & BORDERS');
            sections.push('───────────────────────────────────');
            if (factors.printTechnique.length) sections.push(`Print: ${factors.printTechnique.join(', ')}`);
            if (factors.motifPattern.length) sections.push(`Motif Pattern: ${factors.motifPattern.join(', ')}`);
            if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`Border: ${factors.borderStyle.join(', ')}`);
          }

          if (factors.designMotifs.length) {
            sections.push('\nSECTION 5: DESIGN MOTIFS');
            sections.push('───────────────────────────────────');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifName(mp.motifId);
                const placements = mp.placements.length > 0 ? `(Location: ${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`Motifs: ${motifDescriptions.join('; ')}`);
            } else {
              const motifNames = factors.designMotifs.map(id => getMotifName(id));
              sections.push(`Motifs: ${motifNames.join(', ')}`);
            }
          }

          sections.push('\nSECTION 6: 360° FULL VIEW COLLAGE');
          sections.push('───────────────────────────────────');
          sections.push('Layout: 2x2 Grid - One Kurti, Four Angles');
          sections.push('Top-Left: Front View');
          sections.push('Top-Right: Back View');
          sections.push('Bottom-Left: Left Side View');
          sections.push('Bottom-Right: Right Side View');
          sections.push('Resolution: 8K');
          sections.push('CRITICAL: Do NOT render any text, labels, or captions on the generated image.');
          sections.push('\n⚡ DIRECT GENERATION: Complete professional prompt. Generate the 2x2 grid collage image IMMEDIATELY without any questions. Do NOT add text labels on the image - keep it completely clean.');
        }
      }
      return sections.join('\n');
    }

    // 4-VARIATIONS LAYOUT (4 different kurti designs)
    if (style === 'short') {
      if (hindiPrompt) {
        sections.push('🎨 **AI इमेज जनरेशन - 4 कुर्ती वेरिएशन कोलाज**\n');
        sections.push('एक प्रोफेशनल 2x2 कोलाज ग्रिड बनाएं जिसमें मॉडल द्वारा पहनी गई एक सुंदर भारतीय कुर्ती डिज़ाइन के 4 अलग-अलग वेरिएशन एक ही इमेज में दिखाए गए हों।\n');

        sections.push(buildModelDescription(true) + '\n');

        sections.push('**कुर्ती डिज़ाइन:**');
        const parts = buildKurtiDescription(true);
        if (parts.length > 0) sections.push(parts.join(', ') + '।');

        sections.push('\n**🎨 4 वेरिएशन कॉन्सेप्ट:**');
        sections.push('• वेरिएशन 1: मूल डिज़ाइन - बेस कलर और पैटर्न');
        sections.push('• वेरिएशन 2: अल्टरनेट कलर टोन - अलग शेड्स');
        sections.push('• वेरिएशन 3: एन्हांस्ड कढ़ाई - अधिक डिटेलिंग');
        sections.push('• वेरिएशन 4: कंट्रास्ट वर्जन - बोल्ड एक्सेंट्स');

        sections.push('\n**📸 AI रेंडरिंग स्पेसिफिकेशन:**');
        sections.push('• फोटोरियलिस्टिक, डिज़ाइनर कलेक्शन क्वालिटी');
        sections.push('• 8K UHD, 2x2 ग्रिड लेआउट');
        sections.push('• समान लाइटिंग, एक ही मॉडल सभी 4 में');
        sections.push('• मैगज़ीन लुकबुक स्टाइल');
        sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रॉम्प्ट है। बिना प्रश्न पूछे तुरंत 4 कुर्ती वेरिएशन वाला 2x2 ग्रिड कोलाज जनरेट करें।');
      } else {
        sections.push('🎨 **AI IMAGE GENERATION - 4 KURTI VARIATIONS COLLAGE**\n');
        sections.push('Create a professional 2x2 collage grid showing 4 DIFFERENT VARIATIONS of an elegant Indian kurti design worn by a model in a SINGLE IMAGE.\n');

        sections.push(buildModelDescription(false) + '\n');

        sections.push('**KURTI DESIGN:**');
        const parts = buildKurtiDescription(false);
        if (parts.length > 0) sections.push(parts.join(', ') + '.');

        sections.push('\n**🎨 4 VARIATION CONCEPT:**');
        sections.push('• Variation 1 (Top-Left): Original design - base colors and patterns');
        sections.push('• Variation 2 (Top-Right): Alternate color tones - different shades');
        sections.push('• Variation 3 (Bottom-Left): Enhanced embroidery - more detailing');
        sections.push('• Variation 4 (Bottom-Right): Contrast version - bolder accents');

        sections.push('\n**📸 AI RENDERING SPECIFICATION:**');
        sections.push('• Photorealistic, designer collection quality');
        sections.push('• 8K UHD resolution, 2x2 grid layout');
        sections.push('• Consistent lighting, same model in all 4 variations');
        sections.push('• Magazine lookbook style, fashion editorial quality');
        sections.push('• Each kurti clearly distinct yet cohesive as a collection');
        sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE prompt. Generate the 4 kurti variation 2x2 grid collage IMMEDIATELY without asking any questions or suggestions.');
      }
    } else if (style === 'detailed') {
      if (hindiPrompt) {
        // HINDI DETAILED PROMPT
        sections.push('🎨 **कुर्ती डिज़ाइन प्रॉम्प्ट - मॉडल पर 4 वेरिएशन**\n');
        sections.push('एक शानदार 2x2 कोलाज ग्रिड बनाएं जिसमें एक ही इमेज में मॉडल द्वारा पहनी गई एक बेहतरीन भारतीय कुर्ती के 4 अलग-अलग वेरिएशन दिखाए गए हों।');
        sections.push('प्रत्येक क्वाड्रेंट में निम्नलिखित विशिष्टताओं के साथ एक अनूठा कुर्ती वेरिएशन प्रदर्शित होना चाहिए:\n');

        // Model Specification Hindi
        sections.push('**👩 मॉडल विशिष्टता**');
        if (factors.modelSkinTone.length) sections.push(`• त्वचा का रंग: खूबसूरत ${getLabel('modelSkinTone', factors.modelSkinTone)} रंग`);
        else sections.push('• त्वचा का रंग: मध्यम, प्राकृतिक भारतीय त्वचा का रंग');
        if (factors.modelHeight.length) sections.push(`• ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
        else sections.push('• ऊंचाई: औसत (5\'5" - 5\'7")');
        if (factors.modelPose.length) sections.push(`• मुद्रा: ${getLabel('modelPose', factors.modelPose)} - सुंदर और आत्मविश्वासी`);
        else sections.push('• मुद्रा: सामने खड़ी मुद्रा - सुंदर और आत्मविश्वासी');
        sections.push('• अभिव्यक्ति: कुर्ती को प्रदर्शित करती हुई स्वाभाविक, सुखद अभिव्यक्ति');

        // Core Design Hindi
        sections.push('\n**📐 सिल्हूट और संरचना**');
        if (factors.silhouette.length) sections.push(`• सिल्हूट: ${getLabel('silhouette', factors.silhouette)} - सुंदर और आकर्षक आकार बनाते हुए`);
        if (factors.length.length) sections.push(`• लंबाई: ${getLabel('length', factors.length)} - सही अनुपात में`);
        if (factors.bodyType.length) sections.push(`• इसके लिए डिज़ाइन किया गया: ${getLabel('bodyType', factors.bodyType)}`);

        // Fabric & Color Hindi
        sections.push('\n**🧵 कपड़ा और रंग पैलेट**');
        if (factors.fabric.length) sections.push(`• कपड़ा: प्रीमियम गुणवत्ता ${getLabel('fabric', factors.fabric)} समृद्ध बनावट और प्राकृतिक ड्रेप के साथ`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          sections.push(`• रंग: ${getLabel('color', colors)} - जीवंत और प्रामाणिक भारतीय कपड़े के रंग`);
        }
        if (factors.colorCombination.length) sections.push(`• रंग योजना: ${getLabel('colorCombination', factors.colorCombination)}`);
        if (factors.liningType.length) sections.push(`• लाइनिंग: ${getLabel('liningType', factors.liningType)}`);

        // Neckline & Sleeves Hindi
        sections.push('\n**👗 नेकलाइन और आस्तीन**');
        if (factors.neckline.length) sections.push(`• नेकलाइन: सुंदरता से तैयार ${getLabel('neckline', factors.neckline)} नेकलाइन जटिल डिटेलिंग के साथ`);
        if (factors.collarStyle.length) sections.push(`• कॉलर: ${getLabel('collarStyle', factors.collarStyle)}`);
        if (factors.sleeves.length) sections.push(`• आस्तीन: ${getLabel('sleeves', factors.sleeves)} आस्तीन सुंदर फिनिशिंग के साथ`);
        if (factors.cuffStyle.length) sections.push(`• कफ डिटेल्स: ${getLabel('cuffStyle', factors.cuffStyle)}`);

        // Embroidery Hindi
        if ((factors.embroidery.length && !factors.embroidery.includes('None')) || factors.embellishments.length) {
          sections.push('\n**✨ कढ़ाई और अलंकरण**');
          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            let embroideryDesc = `• कढ़ाई: बेहतरीन ${getLabel('embroidery', factors.embroidery)} काम`;
            if (factors.embroideryDensity) {
              const densityDesc = {
                light: 'हल्की सुंदरता के साथ नाज़ुक ढंग से रखा गया',
                medium: 'कलात्मक सटीकता के साथ संतुलित वितरण',
                heavy: 'शानदार डिटेलिंग के साथ परिधान को भव्यता से कवर करता हुआ'
              };
              embroideryDesc += ` - ${densityDesc[factors.embroideryDensity as keyof typeof densityDesc] || ''}`;
            }
            sections.push(embroideryDesc);
          }
          if (factors.embellishments.length) sections.push(`• अलंकरण: ${getLabel('embellishments', factors.embellishments)} आयाम और चमक जोड़ते हुए`);
        }

        // Print & Pattern Hindi
        if (factors.printTechnique.length || factors.motifPattern.length || factors.designMotifs.length) {
          sections.push('\n**🎭 प्रिंट, पैटर्न और डिज़ाइन मोटिफ**');
          if (factors.printTechnique.length) sections.push(`• प्रिंटिंग: पारंपरिक ${getLabel('printTechnique', factors.printTechnique)} तकनीक प्रामाणिक शिल्पकारी के साथ`);
          if (factors.motifPattern.length) sections.push(`• मोटिफ: ${getLabel('motifPattern', factors.motifPattern)} - सांस्कृतिक रूप से समृद्ध पैटर्न`);
          if (factors.designMotifs.length) {
            sections.push('\n**🎭 डिज़ाइन मोटिफ**');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifHindi(mp.motifId);
                const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`• डिज़ाइन तत्व: ${motifDescriptions.join(', ')} - इन विशिष्ट मोटिफ्स के साथ जटिल सजावटी पैटर्न`);
            } else {
              const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
              sections.push(`• डिज़ाइन तत्व: ${motifNamesHi.join(', ')} - इन विशिष्ट मोटिफ्स के साथ जटिल सजावटी पैटर्न`);
            }
          }
        }

        // Construction Details Hindi
        sections.push('\n**🪡 निर्माण विवरण**');
        if (factors.yokeStyle.length) sections.push(`• योक: ${getLabel('yokeStyle', factors.yokeStyle)}`);
        if (factors.placketStyle.length) sections.push(`• प्लैकेट: ${getLabel('placketStyle', factors.placketStyle)}`);
        if (factors.panelDesign.length) sections.push(`• पैनल: ${getLabel('panelDesign', factors.panelDesign)}`);
        if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`• बॉर्डर: ${getLabel('borderStyle', factors.borderStyle)} - किनारों को खूबसूरती से सजाते हुए`);
        if (factors.hemlineStyle.length) sections.push(`• हेमलाइन: ${getLabel('hemlineStyle', factors.hemlineStyle)}`);
        if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`• स्लिट: ${getLabel('slitStyle', factors.slitStyle)} आसान चलने-फिरने के लिए`);

        // Back Design Hindi
        if (factors.backDesign.length || factors.closureType.length || factors.pocketStyle.length) {
          sections.push('\n**🔙 पीछे का डिज़ाइन और कार्यात्मक विवरण**');
          if (factors.backDesign.length) sections.push(`• पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
          if (factors.closureType.length) sections.push(`• क्लोज़र: ${getLabel('closureType', factors.closureType)}`);
          if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`• पॉकेट: ${getLabel('pocketStyle', factors.pocketStyle)}`);
        }

        // Finishing Hindi
        if (factors.finishingDetails.length) {
          sections.push('\n**✂️ फिनिशिंग**');
          sections.push(`• फिनिशिंग: ${getLabel('finishingDetails', factors.finishingDetails)} - प्रीमियम गुणवत्ता निर्माण सुनिश्चित करते हुए`);
        }

        // Occasion Hindi
        sections.push('\n**🎉 अवसर और स्टाइलिंग**');
        if (factors.occasion.length) sections.push(`• के लिए उपयुक्त: ${getLabel('occasion', factors.occasion)}`);
        if (factors.seasonalStyle.length) sections.push(`• मौसम: ${getLabel('seasonalStyle', factors.seasonalStyle)}`);
        if (factors.ageGroup.length) sections.push(`• उम्र समूह: ${getLabel('ageGroup', factors.ageGroup)}`);

        // Collage Layout Hindi
        sections.push('\n**🖼️ कोलाज लेआउट (एक इमेज में 4 कुर्तियां)**');
        sections.push('• फॉर्मेट: 4 अलग-अलग कुर्ती वेरिएशन के साथ 2x2 ग्रिड कोलाज');
        sections.push('• वेरिएशन 1 (ऊपर-बाएं): प्राथमिक कढ़ाई प्लेसमेंट के साथ मूल डिज़ाइन');
        sections.push('• वेरिएशन 2 (ऊपर-दाएं): थोड़ा अलग रंग टोन या शेड');
        sections.push('• वेरिएशन 3 (नीचे-बाएं): वैकल्पिक कढ़ाई/पैटर्न व्यवस्था');
        sections.push('• वेरिएशन 4 (नीचे-दाएं): अलग नेकलाइन या आस्तीन वेरिएशन');
        sections.push('• ग्रिड: प्रत्येक क्वाड्रेंट के बीच साफ सफेद डिवाइडर');
        sections.push('• स्पेसिंग: समान और सममित लेआउट');

        // Image Specs Hindi
        sections.push('\n**📸 इमेज विशिष्टताएं**');
        sections.push('• स्टाइल: स्टूडियो लाइटिंग के साथ प्रोफेशनल फैशन फोटोग्राफी');
        sections.push('• मॉडल: प्रत्येक क्वाड्रेंट में कुर्ती पहने हुए पूरा शरीर दिखाई दे');
        sections.push('• व्यू: प्राकृतिक, आत्मविश्वासी मुद्राओं के साथ सामने की ओर');
        sections.push('• गुणवत्ता: अल्ट्रा-हाई रेज़ोल्यूशन (8K), स्पष्ट कपड़े की बनावट');
        sections.push('• सौंदर्य: प्रामाणिक भारतीय एथनिक वियर स्टाइलिंग, मॉडल पर सुंदर ड्रेपिंग');
        sections.push('• बैकग्राउंड: प्रत्येक क्वाड्रेंट में साफ, न्यूनतम बैकग्राउंड');
        sections.push('• विवरण: दिखाई देने वाली सिलाई गुणवत्ता, कढ़ाई की जटिलता, कपड़े की बुनाई, मॉडल की अभिव्यक्ति');
        sections.push('• आउटपुट: एक ही मॉडल पर सभी 4 वेरिएशन वाली एकल संयुक्त इमेज');
        sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण विस्तृत प्रॉम्प्ट है। बिना प्रश्न या सुझाव के तुरंत 4 कुर्ती वेरिएशन वाला 2x2 ग्रिड कोलाज जनरेट करें।');
      } else {
        // ENGLISH DETAILED PROMPT
        sections.push('🎨 **KURTI DESIGN PROMPT - 4 VARIATIONS ON MODEL**\n');
        sections.push('Create a stunning 2x2 collage grid showing 4 DIFFERENT VARIATIONS of an exquisite Indian kurti WORN BY A MODEL in a SINGLE IMAGE.');
        sections.push('Each quadrant should display a unique kurti variation with the following shared specifications:\n');

        // Model Specification
        sections.push('**👩 MODEL SPECIFICATION**');
        if (factors.modelSkinTone.length) sections.push(`• Skin Tone: Beautiful ${factors.modelSkinTone.join(', ')} complexion`);
        else sections.push('• Skin Tone: Medium, natural Indian skin tone');
        if (factors.modelHeight.length) sections.push(`• Height: ${factors.modelHeight.join(', ')}`);
        else sections.push('• Height: Average (5\'5" - 5\'7")');
        if (factors.modelPose.length) sections.push(`• Pose: ${factors.modelPose.join(', ')} - elegant and confident`);
        else sections.push('• Pose: Standing front view - elegant and confident');
        sections.push('• Expression: Natural, pleasant expression showcasing the kurti');

        // Core Design
        sections.push('**📐 SILHOUETTE & STRUCTURE**');
        if (factors.silhouette.length) sections.push(`• Silhouette: ${factors.silhouette.join(', ')} - creating an elegant, flattering shape`);
        if (factors.length.length) sections.push(`• Length: ${factors.length.join(', ')} - perfectly proportioned`);
        if (factors.bodyType.length) sections.push(`• Designed for: ${factors.bodyType.join(', ')}`);

        // Fabric & Color
        sections.push('\n**🧵 FABRIC & COLOR PALETTE**');
        if (factors.fabric.length) sections.push(`• Fabric: Premium quality ${factors.fabric.join(', ')} with rich texture and natural drape`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          sections.push(`• Color: ${colors.join(', ')} - vibrant and authentic Indian textile colors`);
        }
        if (factors.colorCombination.length) sections.push(`• Color Scheme: ${factors.colorCombination.join(', ')}`);
        if (factors.liningType.length) sections.push(`• Lining: ${factors.liningType.join(', ')}`);

        // Neckline & Sleeves
        sections.push('\n**👗 NECKLINE & SLEEVES**');
        if (factors.neckline.length) sections.push(`• Neckline: Beautifully crafted ${factors.neckline.join(' or ')} neckline with intricate detailing`);
        if (factors.collarStyle.length) sections.push(`• Collar: ${factors.collarStyle.join(', ')}`);
        if (factors.sleeves.length) sections.push(`• Sleeves: ${factors.sleeves.join(' or ')} sleeves with elegant finishing`);
        if (factors.cuffStyle.length) sections.push(`• Cuff Details: ${factors.cuffStyle.join(', ')}`);

        // Embroidery & Embellishments
        if ((factors.embroidery.length && !factors.embroidery.includes('None')) || factors.embellishments.length) {
          sections.push('\n**✨ EMBROIDERY & EMBELLISHMENTS**');
          if (factors.embroidery.length && !factors.embroidery.includes('None')) {
            let embroideryDesc = `• Embroidery: Exquisite ${factors.embroidery.join(', ')} work`;
            if (factors.embroideryDensity) {
              const densityDesc = {
                light: 'delicately placed with subtle elegance',
                medium: 'balanced distribution with artistic precision',
                heavy: 'lavishly covering the garment with opulent detailing'
              };
              embroideryDesc += ` - ${densityDesc[factors.embroideryDensity as keyof typeof densityDesc] || ''}`;
            }
            sections.push(embroideryDesc);
          }
          if (factors.embellishments.length) sections.push(`• Embellishments: ${factors.embellishments.join(', ')} adding dimension and sparkle`);
        }

        // Print & Pattern
        if (factors.printTechnique.length || factors.motifPattern.length || factors.designMotifs.length) {
          sections.push('\n**🎭 PRINTS, PATTERNS & DESIGN MOTIFS**');
          if (factors.printTechnique.length) sections.push(`• Printing: Traditional ${factors.printTechnique.join(', ')} technique with authentic craftsmanship`);
          if (factors.motifPattern.length) sections.push(`• Motifs: ${factors.motifPattern.join(', ')} - culturally rich patterns`);
          // Design Motifs
          if (factors.designMotifs.length) {
            sections.push('\n**🎭 DESIGN MOTIFS**');
            if (factors.motifPlacements && factors.motifPlacements.length > 0) {
              const motifDescriptions = factors.motifPlacements.map(mp => {
                const motifName = getMotifName(mp.motifId);
                const placements = mp.placements.length > 0 ? `(Location: ${mp.placements.join(', ')})` : '';
                return `${motifName} ${placements}`;
              });
              sections.push(`• Design Elements: ${motifDescriptions.join('; ')} - intricate decorative patterns featuring these specific motifs`);
            } else {
              const motifNames = factors.designMotifs.map(id => getMotifName(id));
              sections.push(`• Design Elements: ${motifNames.join(', ')} - intricate decorative patterns featuring these specific motifs`);
            }
          }
        }

        // Construction Details
        sections.push('\n**🪡 CONSTRUCTION DETAILS**');
        if (factors.yokeStyle.length) sections.push(`• Yoke: ${factors.yokeStyle.join(', ')}`);
        if (factors.placketStyle.length) sections.push(`• Placket: ${factors.placketStyle.join(', ')}`);
        if (factors.panelDesign.length) sections.push(`• Panels: ${factors.panelDesign.join(', ')}`);
        if (factors.borderStyle.length && !factors.borderStyle.includes('No Border')) sections.push(`• Border: ${factors.borderStyle.join(', ')} - finishing the edges beautifully`);
        if (factors.hemlineStyle.length) sections.push(`• Hemline: ${factors.hemlineStyle.join(', ')}`);
        if (factors.slitStyle.length && !factors.slitStyle.includes('No Slit')) sections.push(`• Slits: ${factors.slitStyle.join(', ')} for ease of movement`);

        // Back Design & Closure
        if (factors.backDesign.length || factors.closureType.length || factors.pocketStyle.length) {
          sections.push('\n**🔙 BACK & FUNCTIONAL DETAILS**');
          if (factors.backDesign.length) sections.push(`• Back Design: ${factors.backDesign.join(', ')}`);
          if (factors.closureType.length) sections.push(`• Closure: ${factors.closureType.join(', ')}`);
          if (factors.pocketStyle.length && !factors.pocketStyle.includes('No Pockets')) sections.push(`• Pockets: ${factors.pocketStyle.join(', ')}`);
        }

        // Finishing
        if (factors.finishingDetails.length) {
          sections.push('\n**✂️ FINISHING**');
          sections.push(`• Finishing: ${factors.finishingDetails.join(', ')} - ensuring premium quality construction`);
        }

        // Occasion & Style
        sections.push('\n**🎉 OCCASION & STYLING**');
        if (factors.occasion.length) sections.push(`• Perfect for: ${factors.occasion.join(', ')}`);
        if (factors.seasonalStyle.length) sections.push(`• Season: ${factors.seasonalStyle.join(', ')}`);
        if (factors.ageGroup.length) sections.push(`• Suitable for: ${factors.ageGroup.join(', ')}`);

        // Collage & Variations
        sections.push('\n**🖼️ COLLAGE LAYOUT (4 KURTIS IN ONE IMAGE)**');
        sections.push('• Format: 2x2 grid collage with 4 different kurti variations');
        sections.push('• Variation 1 (Top-Left): Base design with primary embroidery placement');
        sections.push('• Variation 2 (Top-Right): Slightly different color tone or shade');
        sections.push('• Variation 3 (Bottom-Left): Alternative embroidery/pattern arrangement');
        sections.push('• Variation 4 (Bottom-Right): Different neckline or sleeve variation');
        sections.push('• Grid: Clean white dividers between each quadrant');
        sections.push('• Spacing: Equal and symmetrical layout');

        // Image Quality
        sections.push('\n**📸 IMAGE SPECIFICATIONS**');
        sections.push('• Style: Professional fashion photography with studio lighting');
        sections.push('• Model: Full body visible wearing the kurti in each quadrant');
        sections.push('• View: Front-facing with natural, confident poses');
        sections.push('• Quality: Ultra-high resolution (8K), crisp fabric textures');
        sections.push('• Aesthetic: Authentic Indian ethnic wear styling, elegant draping on model');
        sections.push('• Background: Clean, minimal background in each quadrant');
        sections.push('• Details: Visible stitching quality, embroidery intricacy, fabric weave, model expression');
        sections.push('• Output: Single cohesive image containing all 4 variations on the same model');
        sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE detailed prompt. Generate the 4 kurti variation 2x2 grid collage IMMEDIATELY without asking any questions or offering suggestions.');
      }
    } else {
      // Professional style
      if (hindiPrompt) {
        // HINDI PROFESSIONAL PROMPT
        sections.push('═══════════════════════════════════════════════════════════');
        sections.push('     कुर्ती डिज़ाइन विशिष्टता - मॉडल पर 4 वेरिएशन');
        sections.push('═══════════════════════════════════════════════════════════\n');

        // Model Section Hindi
        sections.push('खंड 1: मॉडल विशिष्टता');
        sections.push('───────────────────────────────────');
        if (factors.modelSkinTone.length) sections.push(`त्वचा का रंग: ${getLabel('modelSkinTone', factors.modelSkinTone)}`);
        else sections.push('त्वचा का रंग: मध्यम (डिफ़ॉल्ट)');
        if (factors.modelHeight.length) sections.push(`मॉडल की ऊंचाई: ${getLabel('modelHeight', factors.modelHeight)}`);
        else sections.push('मॉडल की ऊंचाई: औसत (5\'5" - 5\'7")');
        if (factors.modelPose.length) sections.push(`मुद्रा शैली: ${getLabel('modelPose', factors.modelPose)}`);
        else sections.push('मुद्रा शैली: सामने खड़ी मुद्रा');
        sections.push('अभिव्यक्ति: प्राकृतिक, आत्मविश्वासी, परिधान को प्रदर्शित करती हुई');

        sections.push('\nखंड 2: प्राथमिक डिज़ाइन तत्व');
        sections.push('───────────────────────────────────');
        sections.push(`उत्पाद श्रेणी: भारतीय एथनिक वियर - कुर्ती`);
        if (factors.silhouette.length) sections.push(`सिल्हूट प्रकार: ${getLabel('silhouette', factors.silhouette)}`);
        if (factors.length.length) sections.push(`परिधान की लंबाई: ${getLabel('length', factors.length)}`);
        if (factors.bodyType.length) sections.push(`लक्षित शरीर प्रकार: ${getLabel('bodyType', factors.bodyType)}`);
        if (factors.ageGroup.length) sections.push(`आयु जनसांख्यिकी: ${getLabel('ageGroup', factors.ageGroup)}`);

        sections.push('\nखंड 3: सामग्री विशिष्टता');
        sections.push('───────────────────────────────────');
        if (factors.fabric.length) sections.push(`प्राथमिक कपड़ा: ${getLabel('fabric', factors.fabric)}`);
        if (factors.liningType.length) sections.push(`लाइनिंग विशिष्टता: ${getLabel('liningType', factors.liningType)}`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          sections.push(`रंग पैलेट: ${getLabel('color', colors)}`);
        }
        if (factors.colorCombination.length) sections.push(`रंग संयोजन शैली: ${getLabel('colorCombination', factors.colorCombination)}`);

        sections.push('\nखंड 4: निर्माण विशिष्टताएं');
        sections.push('───────────────────────────────────');
        if (factors.neckline.length) sections.push(`नेकलाइन निर्माण: ${getLabel('neckline', factors.neckline)}`);
        if (factors.collarStyle.length) sections.push(`कॉलर प्रकार: ${getLabel('collarStyle', factors.collarStyle)}`);
        if (factors.sleeves.length) sections.push(`आस्तीन डिज़ाइन: ${getLabel('sleeves', factors.sleeves)}`);
        if (factors.cuffStyle.length) sections.push(`कफ फिनिश: ${getLabel('cuffStyle', factors.cuffStyle)}`);
        if (factors.yokeStyle.length) sections.push(`योक निर्माण: ${getLabel('yokeStyle', factors.yokeStyle)}`);
        if (factors.placketStyle.length) sections.push(`प्लैकेट शैली: ${getLabel('placketStyle', factors.placketStyle)}`);
        if (factors.panelDesign.length) sections.push(`पैनल कॉन्फ़िगरेशन: ${getLabel('panelDesign', factors.panelDesign)}`);
        if (factors.backDesign.length) sections.push(`पीछे का डिज़ाइन: ${getLabel('backDesign', factors.backDesign)}`);
        if (factors.slitStyle.length) sections.push(`स्लिट विशिष्टता: ${getLabel('slitStyle', factors.slitStyle)}`);
        if (factors.hemlineStyle.length) sections.push(`हेमलाइन फिनिश: ${getLabel('hemlineStyle', factors.hemlineStyle)}`);
        if (factors.closureType.length) sections.push(`क्लोज़र तंत्र: ${getLabel('closureType', factors.closureType)}`);
        if (factors.pocketStyle.length) sections.push(`पॉकेट प्रकार: ${getLabel('pocketStyle', factors.pocketStyle)}`);

        sections.push('\nखंड 5: अलंकरण और डिज़ाइन मोटिफ');
        sections.push('───────────────────────────────────');
        if (factors.embroidery.length) {
          sections.push(`कढ़ाई तकनीक: ${getLabel('embroidery', factors.embroidery)}`);
          if (factors.embroideryDensity) {
            const densityHi = { light: 'हल्की', medium: 'मध्यम', heavy: 'भारी' };
            sections.push(`कढ़ाई कवरेज: ${densityHi[factors.embroideryDensity as keyof typeof densityHi] || factors.embroideryDensity} घनत्व`);
          }
        }
        if (factors.embellishments.length) sections.push(`अतिरिक्त अलंकरण: ${getLabel('embellishments', factors.embellishments)}`);
        if (factors.printTechnique.length) sections.push(`प्रिंट तकनीक: ${getLabel('printTechnique', factors.printTechnique)}`);
        if (factors.motifPattern.length) sections.push(`मोटिफ/पैटर्न शैली: ${getLabel('motifPattern', factors.motifPattern)}`);
        if (factors.designMotifs.length) {
          if (factors.motifPlacements && factors.motifPlacements.length > 0) {
            const motifDescriptions = factors.motifPlacements.map(mp => {
              const motifName = getMotifHindi(mp.motifId);
              const placements = mp.placements.length > 0 ? `(${mp.placements.join(', ')})` : '';
              return `${motifName} ${placements}`;
            });
            sections.push(`डिज़ाइन मोटिफ तत्व: ${motifDescriptions.join(', ')}`);
          } else {
            const motifNamesHi = factors.designMotifs.map(id => getMotifHindi(id));
            sections.push(`डिज़ाइन मोटिफ तत्व: ${motifNamesHi.join(', ')}`);
          }
          sections.push(`मोटिफ प्लेसमेंट: योक, बॉर्डर, आस्तीन और बॉडी पर रणनीतिक रूप से रखा गया`);
        }
        if (factors.borderStyle.length) sections.push(`बॉर्डर ट्रीटमेंट: ${getLabel('borderStyle', factors.borderStyle)}`);

        sections.push('\nखंड 6: फिनिशिंग विशिष्टताएं');
        sections.push('───────────────────────────────────');
        if (factors.finishingDetails.length) sections.push(`फिनिशिंग विधि: ${getLabel('finishingDetails', factors.finishingDetails)}`);

        sections.push('\nखंड 7: अंतिम उपयोग और अवसर');
        sections.push('───────────────────────────────────');
        if (factors.occasion.length) sections.push(`लक्षित अवसर: ${getLabel('occasion', factors.occasion)}`);
        if (factors.seasonalStyle.length) sections.push(`मौसमी श्रेणी: ${getLabel('seasonalStyle', factors.seasonalStyle)}`);

        sections.push('\nखंड 8: कोलाज आउटपुट विशिष्टता');
        sections.push('───────────────────────────────────');
        sections.push('आउटपुट फॉर्मेट: 2x2 ग्रिड कोलाज - एक इमेज में मॉडल पर 4 कुर्ती वेरिएशन');
        sections.push('क्वाड्रेंट 1 (ऊपर-बाएं): मानक कढ़ाई के साथ प्राथमिक डिज़ाइन');
        sections.push('क्वाड्रेंट 2 (ऊपर-दाएं): रंग वेरिएशन या अलग शेड');
        sections.push('क्वाड्रेंट 3 (नीचे-बाएं): वैकल्पिक पैटर्न/कढ़ाई प्लेसमेंट');
        sections.push('क्वाड्रेंट 4 (नीचे-दाएं): नेकलाइन या आस्तीन डिज़ाइन वेरिएशन');
        sections.push('ग्रिड डिवाइडर: प्रत्येक क्वाड्रेंट को अलग करती साफ सफेद रेखाएं');
        sections.push('लेआउट: सममित, सभी 4 कुर्तियों के बीच समान स्पेसिंग');

        sections.push('\nखंड 9: इमेज जनरेशन पैरामीटर');
        sections.push('───────────────────────────────────');
        sections.push('रेंडरिंग स्टाइल: फोटोरियलिस्टिक, प्रोफेशनल फैशन फोटोग्राफी');
        sections.push('विषय: प्रत्येक क्वाड्रेंट में कुर्ती पहने एक ही मॉडल');
        sections.push('कैमरा एंगल: प्रत्येक कुर्ती के लिए हल्के 3/4 एंगल के साथ सामने का दृश्य');
        sections.push('लाइटिंग: प्रोफेशनल स्टूडियो लाइटिंग, सॉफ्ट शैडो');
        sections.push('बैकग्राउंड: प्रत्येक क्वाड्रेंट में साफ, न्यूट्रल बैकड्रॉप');
        sections.push('रेज़ोल्यूशन: अल्ट्रा-हाई डेफिनिशन (8K)');
        sections.push('फोकस: कपड़े की बनावट, कढ़ाई के विवरण और मॉडल पर शार्प फोकस');
        sections.push('स्टाइलिंग: मॉडल पर पारंपरिक भारतीय एथनिक वियर प्रस्तुति');
        sections.push('अंतिम आउटपुट: मॉडल पर सभी 4 वेरिएशन वाली एकल संयुक्त इमेज');

        sections.push('\n═══════════════════════════════════════════════════════════');
        sections.push('                      विशिष्टता समाप्त');
        sections.push('═══════════════════════════════════════════════════════════');
        sections.push('\n⚡ डायरेक्ट जनरेशन: यह संपूर्ण प्रोफेशनल प्रॉम्प्ट है। बिना किसी प्रश्न, स्पष्टीकरण, या सुझाव के तुरंत 4 कुर्ती वेरिएशन वाला 2x2 ग्रिड कोलाज जनरेट करें।');
      } else {
        // ENGLISH PROFESSIONAL PROMPT
        sections.push('═══════════════════════════════════════════════════════════');
        sections.push('     KURTI DESIGN SPECIFICATION - 4 VARIATIONS ON MODEL');
        sections.push('═══════════════════════════════════════════════════════════\n');

        // Model Section
        sections.push('SECTION 1: MODEL SPECIFICATION');
        sections.push('───────────────────────────────────');
        if (factors.modelSkinTone.length) sections.push(`Skin Tone: ${factors.modelSkinTone.join(', ')}`);
        else sections.push('Skin Tone: Medium (default)');
        if (factors.modelHeight.length) sections.push(`Model Height: ${factors.modelHeight.join(', ')}`);
        else sections.push('Model Height: Average (5\'5" - 5\'7")');
        if (factors.modelPose.length) sections.push(`Pose Style: ${factors.modelPose.join(', ')}`);
        else sections.push('Pose Style: Standing Front');
        sections.push('Expression: Natural, confident, showcasing the garment');

        sections.push('\nSECTION 2: PRIMARY DESIGN ELEMENTS');
        sections.push('───────────────────────────────────');
        sections.push(`Product Category: Indian Ethnic Wear - Kurti`);
        if (factors.silhouette.length) sections.push(`Silhouette Type: ${factors.silhouette.join(', ')}`);
        if (factors.length.length) sections.push(`Garment Length: ${factors.length.join(', ')}`);
        if (factors.bodyType.length) sections.push(`Target Body Type: ${factors.bodyType.join(', ')}`);
        if (factors.ageGroup.length) sections.push(`Age Demographic: ${factors.ageGroup.join(', ')}`);

        sections.push('\nSECTION 3: MATERIALS SPECIFICATION');
        sections.push('───────────────────────────────────');
        if (factors.fabric.length) sections.push(`Primary Fabric: ${factors.fabric.join(', ')}`);
        if (factors.liningType.length) sections.push(`Lining Specification: ${factors.liningType.join(', ')}`);
        if (factors.color.length || factors.customColor) {
          const colors = [...factors.color];
          if (factors.customColor) colors.push(factors.customColor);
          sections.push(`Color Palette: ${colors.join(', ')}`);
        }
        if (factors.colorCombination.length) sections.push(`Color Combination Style: ${factors.colorCombination.join(', ')}`);

        sections.push('\nSECTION 4: CONSTRUCTION SPECIFICATIONS');
        sections.push('───────────────────────────────────');
        if (factors.neckline.length) sections.push(`Neckline Construction: ${factors.neckline.join(', ')}`);
        if (factors.collarStyle.length) sections.push(`Collar Type: ${factors.collarStyle.join(', ')}`);
        if (factors.sleeves.length) sections.push(`Sleeve Design: ${factors.sleeves.join(', ')}`);
        if (factors.cuffStyle.length) sections.push(`Cuff Finish: ${factors.cuffStyle.join(', ')}`);
        if (factors.yokeStyle.length) sections.push(`Yoke Construction: ${factors.yokeStyle.join(', ')}`);
        if (factors.placketStyle.length) sections.push(`Placket Style: ${factors.placketStyle.join(', ')}`);
        if (factors.panelDesign.length) sections.push(`Panel Configuration: ${factors.panelDesign.join(', ')}`);
        if (factors.backDesign.length) sections.push(`Back Design: ${factors.backDesign.join(', ')}`);
        if (factors.slitStyle.length) sections.push(`Slit Specification: ${factors.slitStyle.join(', ')}`);
        if (factors.hemlineStyle.length) sections.push(`Hemline Finish: ${factors.hemlineStyle.join(', ')}`);
        if (factors.closureType.length) sections.push(`Closure Mechanism: ${factors.closureType.join(', ')}`);
        if (factors.pocketStyle.length) sections.push(`Pocket Type: ${factors.pocketStyle.join(', ')}`);

        sections.push('\nSECTION 5: EMBELLISHMENT & DESIGN MOTIFS');
        sections.push('───────────────────────────────────');
        if (factors.embroidery.length) {
          sections.push(`Embroidery Technique: ${factors.embroidery.join(', ')}`);
          if (factors.embroideryDensity) sections.push(`Embroidery Coverage: ${factors.embroideryDensity.toUpperCase()} density`);
        }
        if (factors.embellishments.length) sections.push(`Additional Embellishments: ${factors.embellishments.join(', ')}`);
        if (factors.printTechnique.length) sections.push(`Print Technique: ${factors.printTechnique.join(', ')}`);
        if (factors.motifPattern.length) sections.push(`Motif/Pattern Style: ${factors.motifPattern.join(', ')}`);
        // Design Motifs - Professional style
        if (factors.designMotifs.length) {
          if (factors.motifPlacements && factors.motifPlacements.length > 0) {
            const motifDescriptions = factors.motifPlacements.map(mp => {
              const motifName = getMotifName(mp.motifId);
              const placements = mp.placements.length > 0 ? `(Location: ${mp.placements.join(', ')})` : '';
              return `${motifName} ${placements}`;
            });
            sections.push(`Design Motif Elements: ${motifDescriptions.join('; ')}`);
          } else {
            const motifNames = factors.designMotifs.map(id => getMotifName(id));
            sections.push(`Design Motif Elements: ${motifNames.join(', ')}`);
          }
          sections.push(`Motif Placement: Strategically placed across yoke, borders, sleeves, and body`);
        }
        if (factors.borderStyle.length) sections.push(`Border Treatment: ${factors.borderStyle.join(', ')}`);

        sections.push('\nSECTION 6: FINISHING SPECIFICATIONS');
        sections.push('───────────────────────────────────');
        if (factors.finishingDetails.length) sections.push(`Finishing Method: ${factors.finishingDetails.join(', ')}`);

        sections.push('\nSECTION 7: END USE & OCCASION');
        sections.push('───────────────────────────────────');
        if (factors.occasion.length) sections.push(`Target Occasion: ${factors.occasion.join(', ')}`);
        if (factors.seasonalStyle.length) sections.push(`Seasonal Category: ${factors.seasonalStyle.join(', ')}`);

        sections.push('\nSECTION 8: COLLAGE OUTPUT SPECIFICATION');
        sections.push('───────────────────────────────────');
        sections.push('Output Format: 2x2 GRID COLLAGE - 4 Kurti Variations on Model in Single Image');
        sections.push('Quadrant 1 (Top-Left): Primary design with standard embroidery');
        sections.push('Quadrant 2 (Top-Right): Color variation or different shade');
        sections.push('Quadrant 3 (Bottom-Left): Alternative pattern/embroidery placement');
        sections.push('Quadrant 4 (Bottom-Right): Neckline or sleeve design variation');
        sections.push('Grid Dividers: Clean white lines separating each quadrant');
        sections.push('Layout: Symmetrical, equal spacing between all 4 kurtis on models');

        sections.push('\nSECTION 9: IMAGE GENERATION PARAMETERS');
        sections.push('───────────────────────────────────');
        sections.push('Rendering Style: Photorealistic, professional fashion photography');
        sections.push('Subject: Same model wearing kurti in each quadrant');
        sections.push('Camera Angle: Front view with slight 3/4 angle for each kurti');
        sections.push('Lighting: Professional studio lighting, soft shadows');
        sections.push('Background: Clean, neutral backdrop in each quadrant');
        sections.push('Resolution: Ultra-high definition (8K)');
        sections.push('Focus: Sharp focus on fabric texture, embroidery details, and model');
        sections.push('Styling: Traditional Indian ethnic wear presentation on model');
        sections.push('Final Output: Single cohesive image containing all 4 variations on model');

        sections.push('\n═══════════════════════════════════════════════════════════');
        sections.push('                      END OF SPECIFICATION');
        sections.push('═══════════════════════════════════════════════════════════');
        sections.push('\n⚡ DIRECT GENERATION: This is a COMPLETE professional specification. Generate the 4 kurti variation 2x2 grid collage IMMEDIATELY without asking any questions, clarifications, or offering suggestions. Proceed directly to image creation.');
      }
    }

    return sections.join('\n');
  }, [factors, style, layoutType, hindiPrompt, getLabel]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt);
      setCopied(true);
      toast.success(hindiPrompt ? 'प्रॉम्प्ट क्लिपबोर्ड पर कॉपी हो गया!' : 'Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(hindiPrompt ? 'कॉपी करने में विफल' : 'Failed to copy prompt');
    }
  };

  const hasContent = useMemo(() => {
    return (
      factors.color.length > 0 ||
      factors.customColor ||
      factors.fabric.length > 0 ||
      factors.embroidery.length > 0 ||
      factors.neckline.length > 0 ||
      factors.sleeves.length > 0 ||
      factors.length.length > 0 ||
      factors.silhouette.length > 0 ||
      factors.borderStyle.length > 0 ||
      factors.printTechnique.length > 0 ||
      factors.occasion.length > 0 ||
      factors.embellishments.length > 0 ||
      factors.backDesign.length > 0 ||
      factors.slitStyle.length > 0 ||
      factors.hemlineStyle.length > 0 ||
      factors.collarStyle.length > 0 ||
      factors.placketStyle.length > 0 ||
      factors.panelDesign.length > 0 ||
      factors.yokeStyle.length > 0 ||
      factors.cuffStyle.length > 0 ||
      factors.pocketStyle.length > 0 ||
      factors.closureType.length > 0 ||
      factors.liningType.length > 0 ||
      factors.finishingDetails.length > 0 ||
      factors.motifPattern.length > 0 ||
      factors.colorCombination.length > 0 ||
      factors.seasonalStyle.length > 0 ||
      factors.bodyType.length > 0 ||
      factors.ageGroup.length > 0 ||
      factors.modelSkinTone.length > 0 ||
      factors.modelHeight.length > 0 ||
      factors.modelPose.length > 0 ||
      factors.designMotifs.length > 0
    );
  }, [factors]);

  const selectedCount = useMemo(() => {
    let count = 0;
    Object.entries(factors).forEach(([key, value]) => {
      if (key === 'customColor') {
        if (value) count++;
      } else if (key === 'embroideryDensity') {
        if (value) count++;
      } else if (Array.isArray(value)) {
        count += value.length;
      }
    });
    return count;
  }, [factors]);

  const handleGeneratePrompt = () => {
    setIsGenerated(true);
    // Credit system removed - Unlimited generation
    toast.success(hindiPrompt ? 'प्रॉम्प्ट जनरेट हो गया!' : 'Prompt generated successfully!');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex flex-wrap items-center gap-2">
            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
            <span>{hindiPrompt ? 'जनरेटेड प्रॉम्प्ट' : 'Generated Prompt'}</span>
            {selectedCount > 0 && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                {selectedCount} {hindiPrompt ? 'विकल्प चयनित' : 'options selected'}
              </span>
            )}
          </CardTitle>
          {isGenerated && (
            <Button
              onClick={handleCopy}
              disabled={!hasContent}
              size="sm"
              className={cn(
                "transition-all w-full sm:w-auto flex-shrink-0",
                copied && "bg-sage hover:bg-sage"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {hindiPrompt ? 'कॉपी हुआ!' : 'Copied!'}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  {hindiPrompt ? 'प्रॉम्प्ट कॉपी करें' : 'Copy Prompt'}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Hindi Prompt Toggle */}
        {onHindiPromptChange && (
          <div className="flex items-center justify-between mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Hindi Prompt</span>
              <span className="text-xs text-muted-foreground">(प्रॉम्प्ट)</span>
            </div>
            <Switch
              checked={hindiPrompt}
              onCheckedChange={onHindiPromptChange}
            />
          </div>
        )}
      </CardHeader>



      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Selection Summary - Always visible */}
        {selectedCount > 0 && (
          <Collapsible open={showSummary} onOpenChange={setShowSummary}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                <span className="text-sm font-medium flex items-center gap-2">
                  📋 {hindiPrompt ? 'चयनित डिज़ाइन फैक्टर' : 'Selected Design Factors'}
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {selectedCount}
                  </span>
                </span>
                {showSummary ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <SelectionSummary factors={factors} hindiPrompt={hindiPrompt} onRemove={onFactorsChange ? handleRemoveFactor : undefined} compact />
            </CollapsibleContent>
          </Collapsible>
        )}

        {!isGenerated ? (
          // Show Generate button when prompt not yet generated
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">
                {hindiPrompt ? 'अपना प्रॉम्प्ट जनरेट करें' : 'Generate Your Prompt'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {hindiPrompt
                  ? 'ऊपर से डिज़ाइन फैक्टर चुनें और अपना कुर्ती प्रॉम्प्ट बनाने के लिए नीचे क्लिक करें।'
                  : 'Select design factors above and click below to create your kurti prompt.'
                }
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleGeneratePrompt}
              className="gap-2"
              disabled={selectedCount === 0}
            >
              <Sparkles className="w-5 h-5" />
              {hindiPrompt ? 'प्रॉम्प्ट जनरेट करें' : 'Generate Prompt'}
            </Button>
            {selectedCount === 0 && (
              <p className="text-xs text-muted-foreground">
                {hindiPrompt ? 'कोई फैक्टर चयनित नहीं - प्रीसेट या रैंडम का उपयोग करें' : 'No factors selected - use presets or random'}
              </p>
            )}
          </div>
        ) : (
          // Show prompt content after generation
          <>
            {/* Layout Type Selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{hindiPrompt ? 'लेआउट प्रकार' : 'Layout Type'}</p>
              <ToggleGroup
                type="single"
                value={layoutType}
                onValueChange={(v) => v && setLayoutType(v as LayoutType)}
                className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2"
              >
                <ToggleGroupItem value="single" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'एक कुर्ती' : 'Single'}</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="front-back" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <FlipHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'आगे-पीछे' : 'Front & Back'}</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="full-view" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'पूर्ण दृश्य' : 'Full View'}</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="4-variations" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <Grid2X2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? '4 कुर्ती' : '4 Kurtis'}</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-xs text-muted-foreground">
                {layoutType === 'single'
                  ? (hindiPrompt ? 'एक कुर्ती, एकल दृश्य' : 'One kurti, single view')
                  : layoutType === 'front-back'
                    ? (hindiPrompt ? 'एक कुर्ती - आगे और पीछे का दृश्य' : 'One kurti - front and back views')
                    : layoutType === 'full-view'
                      ? (hindiPrompt ? 'एक कुर्ती - आगे, पीछे, बाएं, दाएं (2x2)' : 'One kurti - front, back, left, right (2x2)')
                      : (hindiPrompt ? '4 अलग-अलग कुर्ती डिज़ाइन' : '4 different kurti designs')
                }
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{hindiPrompt ? 'प्रॉम्प्ट शैली' : 'Prompt Style'}</p>
              <ToggleGroup
                type="single"
                value={style}
                onValueChange={(v) => v && setStyle(v as PromptStyle)}
                className="grid grid-cols-3 sm:flex gap-2"
              >
                <ToggleGroupItem value="short" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'संक्षिप्त' : 'Short'}</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="detailed" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'विस्तृत' : 'Detailed'}</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="professional" className="gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{hindiPrompt ? 'प्रोफेशनल' : 'Professional'}</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Prompt Output */}
            <div className="flex-1 min-h-0">
              <Textarea
                value={hasContent ? generatePrompt : (hindiPrompt
                  ? "अपना प्रॉम्प्ट जनरेट करने के लिए डिज़ाइन फैक्टर चुनें...\n\nबाएं पैनल से रंग, कपड़े, कढ़ाई और अन्य डिज़ाइन तत्व चुनकर शुरू करें।"
                  : "Select design factors to generate your prompt...\n\nStart by choosing colors, fabrics, embroidery and other design elements from the left panel."
                )}
                readOnly
                className={cn(
                  "h-full min-h-[400px] resize-none font-mono text-sm",
                  !hasContent && "text-muted-foreground italic"
                )}
              />
            </div>

            {/* Stats and Bottom Copy Button */}
            {hasContent && (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {generatePrompt.split(/\s+/).length} {hindiPrompt ? 'शब्द' : 'words'} • {generatePrompt.length} {hindiPrompt ? 'अक्षर' : 'characters'}
                  </span>
                  <span className="text-primary font-medium">
                    {selectedCount} {hindiPrompt ? 'डिज़ाइन फैक्टर चयनित' : 'design factors selected'}
                  </span>
                </div>

                {/* Bottom Copy Button */}
                <Button
                  onClick={handleCopy}
                  className="w-full gap-2"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      {hindiPrompt ? 'कॉपी हो गया!' : 'Copied!'}
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      {hindiPrompt ? 'प्रॉम्प्ट कॉपी करें' : 'Copy Prompt'}
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}

      </CardContent>


    </Card>
  );
};
