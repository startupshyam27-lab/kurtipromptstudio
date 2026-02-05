import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { COLOR_GROUPS, COLOR_TRANSLATIONS_HI, COLOR_PREVIEWS } from '@/data/colorGroups';
import { cn } from '@/lib/utils';
import { ChevronDown, Palette } from 'lucide-react';

interface ColorGroupSelectorProps {
  selected: string[];
  onSelect: (colors: string[]) => void;
  showHindi?: boolean;
  searchQuery?: string;
}

export const ColorGroupSelector: React.FC<ColorGroupSelectorProps> = ({
  selected,
  onSelect,
  showHindi = false,
  searchQuery = '',
}) => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // Filter groups based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return COLOR_GROUPS;
    const query = searchQuery.toLowerCase();
    const result: Record<string, { label: string; colors: string[] }> = {};
    
    Object.entries(COLOR_GROUPS).forEach(([key, group]) => {
      const filteredColors = group.colors.filter(color => {
        const hindiLabel = COLOR_TRANSLATIONS_HI[color] || '';
        return color.toLowerCase().includes(query) || hindiLabel.includes(query);
      });
      
      if (filteredColors.length > 0) {
        result[key] = { label: group.label, colors: filteredColors };
      }
    });
    
    return result;
  }, [searchQuery]);

  const hasMatches = Object.keys(filteredGroups).length > 0;
  const shouldBeOpen = searchQuery && hasMatches ? true : isMainOpen;

  const toggleGroup = (groupKey: string) => {
    setOpenGroups(prev =>
      prev.includes(groupKey)
        ? prev.filter(k => k !== groupKey)
        : [...prev, groupKey]
    );
  };

  const toggleColor = (color: string) => {
    if (selected.includes(color)) {
      onSelect(selected.filter(c => c !== color));
    } else {
      onSelect([...selected, color]);
    }
  };

  const getColorLabel = (color: string) => {
    if (showHindi && COLOR_TRANSLATIONS_HI[color]) {
      return `${color} / ${COLOR_TRANSLATIONS_HI[color]}`;
    }
    return color;
  };

  const getSelectedCountInGroup = (colors: string[]) => {
    return colors.filter(c => selected.includes(c)).length;
  };

  const clearAll = () => onSelect([]);

  const totalColors = Object.values(COLOR_GROUPS).reduce((acc, g) => acc + g.colors.length, 0);
  const filteredTotal = Object.values(filteredGroups).reduce((acc, g) => acc + g.colors.length, 0);

  // Hide if no matches
  if (searchQuery && !hasMatches) return null;

  return (
    <Collapsible open={shouldBeOpen} onOpenChange={setIsMainOpen} className="border rounded-lg bg-card">
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors rounded-lg">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">
              {(showHindi || searchQuery) ? 'Color Palette / रंग पैलेट' : 'Color Palette'}
            </span>
            <span className="text-xs text-muted-foreground">
              ({searchQuery ? `${filteredTotal}/${totalColors}` : totalColors})
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

          {/* Color Groups */}
          <div className="space-y-1.5">
            {Object.entries(filteredGroups).map(([groupKey, group]) => {
              const isOpen = searchQuery ? true : openGroups.includes(groupKey);
              const selectedInGroup = getSelectedCountInGroup(group.colors);

              return (
                <Collapsible key={groupKey} open={isOpen} onOpenChange={() => toggleGroup(groupKey)}>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                      <div className="flex items-center gap-2">
                        {/* Color preview dots */}
                        <div className="flex -space-x-1">
                          {group.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-background"
                              style={{
                                background: COLOR_PREVIEWS[color] || '#ccc',
                                zIndex: 3 - i
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{group.label}</span>
                        <span className="text-xs text-muted-foreground">({group.colors.length})</span>
                        {selectedInGroup > 0 && (
                          <Badge variant="default" className="text-xs h-5">
                            {selectedInGroup}
                          </Badge>
                        )}
                      </div>
                      <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-background/50 rounded-b-lg border border-t-0">
                      {group.colors.map((color) => {
                        const isSelected = selected.includes(color);
                        const colorPreview = COLOR_PREVIEWS[color];
                        const isGradient = colorPreview?.includes('gradient');

                        return (
                          <Badge
                            key={color}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all text-xs py-1.5 px-2.5 hover:scale-105 gap-1.5",
                              isSelected
                                ? "bg-primary hover:bg-primary/90"
                                : "hover:bg-primary/10 hover:border-primary"
                            )}
                            onClick={() => toggleColor(color)}
                          >
                            <span
                              className={cn(
                                "w-3 h-3 rounded-full border flex-shrink-0",
                                isSelected ? "border-primary-foreground/50" : "border-border"
                              )}
                              style={{
                                background: isGradient ? colorPreview : colorPreview,
                              }}
                            />
                            {getColorLabel(color)}
                          </Badge>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
