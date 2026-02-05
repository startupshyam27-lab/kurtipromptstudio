import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ChevronDown, Sparkles, MapPin, X } from 'lucide-react';
import { DESIGN_MOTIF_GROUPS, TOTAL_MOTIF_COUNT, DesignMotif, DesignMotifGroup } from '@/data/designMotifs';
import { MotifPlacement, MOTIF_PLACEMENT_OPTIONS } from '@/types/kurti';

interface DesignMotifSelectorProps {
  selected: string[];
  onSelect: (values: string[]) => void;
  motifPlacements: MotifPlacement[];
  onPlacementsChange: (placements: MotifPlacement[]) => void;
  onMotifUpdate?: (motifs: string[], placements: MotifPlacement[]) => void;
  showHindi: boolean;


  searchQuery?: string;
}

export const DesignMotifSelector: React.FC<DesignMotifSelectorProps> = ({
  selected,
  onSelect,
  motifPlacements,
  onPlacementsChange,
  onMotifUpdate,
  showHindi,
  searchQuery = '',
}) => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [placementDialogOpen, setPlacementDialogOpen] = useState(false);
  const [selectedMotifForPlacement, setSelectedMotifForPlacement] = useState<string | null>(null);

  // Filter motifs based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return DESIGN_MOTIF_GROUPS;

    const query = searchQuery.toLowerCase();

    return DESIGN_MOTIF_GROUPS.map(group => {
      const matchingMotifs = group.motifs.filter(motif =>
        motif.name.toLowerCase().includes(query) ||
        motif.nameHi.includes(query) ||
        motif.id.toLowerCase().includes(query)
      );

      if (matchingMotifs.length > 0 ||
        group.label.toLowerCase().includes(query) ||
        group.labelHi.includes(query)) {
        return {
          ...group,
          motifs: matchingMotifs.length > 0 ? matchingMotifs : group.motifs,
        };
      }
      return null;
    }).filter((g): g is DesignMotifGroup => g !== null);
  }, [searchQuery]);

  const shouldMainBeOpen = searchQuery && filteredGroups.length > 0 ? true : isMainOpen;

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev =>
      prev.includes(groupLabel)
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  const toggleMotif = (motifId: string) => {
    if (selected.includes(motifId)) {
      // Remove motif and its placements
      const newSelected = selected.filter(s => s !== motifId);
      const newPlacements = motifPlacements.filter(p => p.motifId !== motifId);

      if (onMotifUpdate) {
        onMotifUpdate(newSelected, newPlacements);
      } else {
        onSelect(newSelected);
        onPlacementsChange(newPlacements);
      }
    } else {
      // Add motif with default placement AND open dialog
      const newSelected = [...selected, motifId];
      const newPlacements = [...motifPlacements, { motifId, placements: ['Front Center'] }];

      if (onMotifUpdate) {
        onMotifUpdate(newSelected, newPlacements);
      } else {
        onSelect(newSelected);
        onPlacementsChange(newPlacements);
      }

      // Auto-open placement dialog for better UX
      setSelectedMotifForPlacement(motifId);
      setPlacementDialogOpen(true);
    }
  };

  const openPlacementDialog = (motifId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMotifForPlacement(motifId);
    setPlacementDialogOpen(true);
  };

  const getMotifPlacements = (motifId: string): string[] => {
    const placement = motifPlacements.find(p => p.motifId === motifId);
    return placement?.placements || ['Front Center'];
  };

  const updateMotifPlacements = (motifId: string, placements: string[]) => {
    const existingIndex = motifPlacements.findIndex(p => p.motifId === motifId);
    if (existingIndex >= 0) {
      const updated = [...motifPlacements];
      updated[existingIndex] = { motifId, placements: placements.length > 0 ? placements : ['Front Center'] };
      onPlacementsChange(updated);
    } else {
      onPlacementsChange([...motifPlacements, { motifId, placements: placements.length > 0 ? placements : ['Front Center'] }]);
    }
  };

  const togglePlacement = (placement: string) => {
    if (!selectedMotifForPlacement) return;

    const currentPlacements = getMotifPlacements(selectedMotifForPlacement);
    const newPlacements = currentPlacements.includes(placement)
      ? currentPlacements.filter(p => p !== placement)
      : [...currentPlacements, placement];

    updateMotifPlacements(selectedMotifForPlacement, newPlacements);
  };

  const clearAll = () => {
    onSelect([]);
    onPlacementsChange([]);
  };

  const getMotifLabel = (motif: DesignMotif) => {
    if (showHindi) {
      return `${motif.name} / ${motif.nameHi}`;
    }
    return motif.name;
  };

  // Find a motif by ID across all groups
  const findMotif = (motifId: string): DesignMotif | undefined => {
    for (const group of DESIGN_MOTIF_GROUPS) {
      const motif = group.motifs.find(m => m.id === motifId);
      if (motif) return motif;
    }
    return undefined;
  };

  // Hide if no matches
  if (searchQuery && filteredGroups.length === 0) return null;

  return (
    <>
      <Collapsible open={shouldMainBeOpen} onOpenChange={setIsMainOpen} className="border rounded-lg bg-card">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors rounded-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-sm">
                {(showHindi || searchQuery) ? 'Design Motifs / डिज़ाइन मोटिफ' : 'Design Motifs'}
              </span>
              {selected.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selected.length} selected
                </Badge>
              )}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", shouldMainBeOpen && "rotate-180")} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-3 pb-3 space-y-2">
            {selected.length > 0 && (
              <div className="flex items-center gap-2 pb-2 border-b">
                <span className="text-xs text-muted-foreground">Selected:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selected.slice(0, 5).map((motifId) => {
                    const motif = findMotif(motifId);
                    const placements = getMotifPlacements(motifId);
                    return motif ? (
                      <div key={motifId} className="relative group">
                        <Badge variant="default" className="text-xs font-mono pr-1">
                          <span className="mr-1 opacity-70">{motif.thumbnail}</span> {motif.name}
                          <button
                            onClick={(e) => openPlacementDialog(motifId, e)}
                            className="ml-1 p-0.5 hover:bg-primary-foreground/20 rounded transition-colors"
                            title="Configure placement"
                          >
                            <MapPin className="w-3 h-3" />
                          </button>
                        </Badge>
                        {placements.length > 0 && (
                          <div className="absolute -bottom-1 left-0 right-0 flex justify-center gap-0.5 pointer-events-none">
                            {placements.slice(0, 2).map((p, i) => (
                              <span key={i} className="text-[8px] bg-primary/80 text-primary-foreground px-1 rounded-sm">
                                {p.split(' ')[0]}
                              </span>
                            ))}
                            {placements.length > 2 && (
                              <span className="text-[8px] bg-primary/80 text-primary-foreground px-1 rounded-sm">
                                +{placements.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                  {selected.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{selected.length - 5} more
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6 ml-auto">
                  Clear all
                </Button>
              </div>
            )}

            {/* Design Groups */}
            <div className="space-y-1.5">
              {filteredGroups.map((group) => {
                const isGroupOpen = openGroups.includes(group.label) || (searchQuery.length > 0);
                const selectedInGroup = group.motifs.filter(m => selected.includes(m.id)).length;

                return (
                  <Collapsible
                    key={group.label}
                    open={isGroupOpen}
                    onOpenChange={() => toggleGroup(group.label)}
                    className="border rounded-md bg-muted/30"
                  >
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full p-2 hover:bg-muted/50 transition-colors rounded-md">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-muted-foreground">{group.icon}</span>
                          <span className="text-sm font-medium">
                            {showHindi ? `${group.label} / ${group.labelHi}` : group.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({group.motifs.length})
                          </span>
                          {selectedInGroup > 0 && (
                            <Badge variant="default" className="text-xs h-5">
                              {selectedInGroup}
                            </Badge>
                          )}
                        </div>
                        <ChevronDown className={cn("w-3 h-3 transition-transform", isGroupOpen && "rotate-180")} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-2 pt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                          {group.motifs.map((motif) => {
                            const isSelected = selected.includes(motif.id);
                            return (
                              <button
                                key={motif.id}
                                onClick={() => toggleMotif(motif.id)}
                                className={cn(
                                  "flex items-center gap-1.5 p-2 rounded-md text-left transition-all text-xs",
                                  "border hover:border-primary/50 hover:bg-primary/5",
                                  isSelected
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-background border-border"
                                )}
                              >
                                <span className="text-xs font-mono flex-shrink-0 text-muted-foreground w-8 text-center">
                                  {motif.thumbnail}
                                </span>
                                <span className="truncate leading-tight flex-1">
                                  {showHindi ? (
                                    <span className="flex flex-col">
                                      <span className="font-medium">{motif.name}</span>
                                      <span className="text-[10px] text-muted-foreground">{motif.nameHi}</span>
                                    </span>
                                  ) : (
                                    motif.name
                                  )}
                                </span>
                                {isSelected && (
                                  <div
                                    role="button"
                                    onClick={(e) => openPlacementDialog(motif.id, e)}
                                    className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors ml-1"
                                    title="Change placement"
                                  >
                                    <MapPin className="w-3.5 h-3.5" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Placement Configuration Dialog */}
      <Dialog open={placementDialogOpen} onOpenChange={setPlacementDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Configure Motif Placement
            </DialogTitle>
            <DialogDescription>
              Select where you want this motif to appear on the kurti. You can choose multiple placements.
            </DialogDescription>
          </DialogHeader>

          {selectedMotifForPlacement && (
            <div className="space-y-4">
              {/* Show selected motif */}
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Selected Motif:</p>
                <div className="flex items-center gap-2">
                  {(() => {
                    const motif = findMotif(selectedMotifForPlacement);
                    return motif ? (
                      <Badge variant="default" className="text-sm">
                        <span className="mr-1">{motif.thumbnail}</span>
                        {motif.name}
                      </Badge>
                    ) : null;
                  })()}
                </div>
              </div>

              {/* Placement options */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Placement Options:</p>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {MOTIF_PLACEMENT_OPTIONS.map((placement) => {
                    const isSelected = getMotifPlacements(selectedMotifForPlacement).includes(placement);
                    return (
                      <div
                        key={placement}
                        className={cn(
                          "flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors",
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        )}
                        onClick={() => togglePlacement(placement)}
                      >
                        <Checkbox
                          id={placement}
                          checked={isSelected}
                          onCheckedChange={() => togglePlacement(placement)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label
                          htmlFor={placement}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {placement}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected placements summary */}
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Selected Placements:</p>
                <div className="flex flex-wrap gap-1">
                  {getMotifPlacements(selectedMotifForPlacement).map((placement) => (
                    <Badge key={placement} variant="secondary" className="text-xs">
                      {placement}
                      <button
                        onClick={() => togglePlacement(placement)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {getMotifPlacements(selectedMotifForPlacement).length === 0 && (
                    <span className="text-xs text-muted-foreground">No placements selected (will default to Front Center)</span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setPlacementDialogOpen(false)}
                className="w-full"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
