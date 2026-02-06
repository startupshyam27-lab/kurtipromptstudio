import React, { useState } from 'react';
import { Settings2, FileText, ChevronRight, Home, RotateCcw, BookOpen, Info, ChevronDown, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DesignFactorSelector } from '@/components/DesignFactorSelector';
import { PromptGenerator } from '@/components/PromptGenerator';
import { HomePage } from '@/components/HomePage';
import { UserGuide } from '@/components/UserGuide';
import { LicenseStatus } from '@/components/LicenseStatus';
import { UserProfileDialog } from '@/components/UserProfileDialog';
import { LicenseBarrier } from '@/components/LicenseBarrier';
import { useLicense } from '@/contexts/LicenseContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DesignFactors } from '@/types/kurti';
import logoImage from '@/assets/logo.png';
const initialFactors: DesignFactors = {
  color: [],
  customColor: '',
  fabric: [],
  embroidery: [],
  embroideryDensity: '',
  neckline: [],
  sleeves: [],
  length: [],
  silhouette: [],
  borderStyle: [],
  printTechnique: [],
  occasion: [],
  embellishments: [],
  backDesign: [],
  slitStyle: [],
  hemlineStyle: [],
  collarStyle: [],
  placketStyle: [],
  panelDesign: [],
  yokeStyle: [],
  cuffStyle: [],
  pocketStyle: [],
  closureType: [],
  liningType: [],
  finishingDetails: [],
  motifPattern: [],
  colorCombination: [],
  seasonalStyle: [],
  bodyType: [],
  ageGroup: [],
  // Model Display - no default selections
  modelSkinTone: [],
  modelHeight: [],
  modelPose: [],
  // Design Motifs - 500+ design options
  designMotifs: [],
  motifPlacements: [],
};

const Index = () => {
  const { isLicensed } = useLicense();
  const [factors, setFactors] = useState<DesignFactors>(initialFactors);
  const [activeTab, setActiveTab] = useState('home');
  const [hindiPrompt, setHindiPrompt] = useState(false);

  const handleReset = () => {
    setFactors(initialFactors);
  };

  const selectedCount = React.useMemo(() => {
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

  const steps = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'design', label: 'Design', icon: Settings2 },
    { id: 'generate', label: 'Generate Prompt for Kurti', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logoImage} alt="Kurti Prompt Studio" className="w-14 h-14 rounded-xl object-contain bg-primary/5 p-1" />
              <div className="text-left">
                <h1 className="text-xl font-bold text-gradient">Kurti Prompt Studio</h1>
                <p className="text-xs text-muted-foreground">Design your kurti with prompts</p>
              </div>
            </button>

            {/* Step Indicator - Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeTab === step.id;
                const isPast = steps.findIndex((s) => s.id === activeTab) > index;

                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => setActiveTab(step.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : isPast
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* License Status & Profile - Visible on ALL devices */}
            <div className="flex items-center gap-2">
              <LicenseStatus />
              <UserProfileDialog />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Mobile Tab List */}
          <div className="container mx-auto px-4 pt-4">
            <TabsList className="md:hidden w-full grid grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <TabsTrigger key={step.id} value={step.id} className="flex flex-col gap-1 py-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{step.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Home Tab */}
          <TabsContent value="home" className="mt-0">
            <HomePage onStart={() => setActiveTab('design')} />
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="animate-fade-in">
            {isLicensed ? (
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Select Design Factors</h2>
                      <p className="text-muted-foreground">
                        Choose the options you want. Skip what you don't need.
                      </p>
                    </div>
                    {selectedCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset All
                      </Button>
                    )}
                  </div>
                  <DesignFactorSelector
                    factors={factors}
                    onFactorsChange={setFactors}
                    hindiPrompt={hindiPrompt}
                    onHindiPromptChange={setHindiPrompt}
                  />

                  {/* Selection Summary & Continue Button */}
                  <div className="mt-8 p-6 bg-muted/50 rounded-xl border">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-muted-foreground">Selected Options</p>
                        <p className="text-2xl font-bold text-primary">
                          {selectedCount} {selectedCount === 1 ? 'factor' : 'factors'}
                        </p>
                        {selectedCount === 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Select design options above or use Quick Presets
                          </p>
                        )}
                      </div>
                      <Button
                        size="lg"
                        onClick={() => setActiveTab('generate')}
                        className="gap-2"
                      >
                        Continue to Generate
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container mx-auto px-4 py-12">
                <LicenseBarrier inline />
              </div>
            )}
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate" className="animate-fade-in">
            {isLicensed ? (
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Generated Prompt</h2>
                    <p className="text-muted-foreground">
                      Copy this prompt and paste it into any AI image generation tool.
                    </p>
                  </div>
                  <PromptGenerator factors={factors} onFactorsChange={setFactors} hindiPrompt={hindiPrompt} onHindiPromptChange={setHindiPrompt} />

                  <div className="mt-8 p-6 bg-muted/50 rounded-xl">
                    <h3 className="font-semibold mb-3">How to Use Your Prompt</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs">1</span>
                        <span>Click the "Copy Prompt" button above</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs">2</span>
                        <span>Open your preferred AI image generator (Midjourney, DALL-E, Stable Diffusion, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs">3</span>
                        <span>Paste the prompt and generate your kurti design!</span>
                      </li>
                    </ol>

                    {/* Important Note - Collapsible */}
                    <Collapsible className="mt-4 pt-4 border-t">
                      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        <Info className="w-4 h-4" />
                        <span>View Important Note</span>
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3 p-3 bg-accent/50 border border-border rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-foreground">
                            <p className="font-medium mb-1">Why does AI generate different images each time?</p>
                            <p className="text-muted-foreground">
                              Even if you paste the <strong>same prompt</strong> multiple times, AI will generate <strong>different images</strong> each time.
                              This happens because AI uses random "seed" values during generation, making each output unique.
                              This is a feature, not a bug — it gives you multiple design variations to choose from!
                            </p>
                            <p className="mt-2 text-muted-foreground">
                              <strong>Tip:</strong> If you like a specific result, save it immediately. You can also use the same prompt multiple times to explore different variations of your design.
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container mx-auto px-4 py-12">
                <LicenseBarrier inline />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Kurti Prompt Studio — Design your perfect kurti with AI-ready prompts</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
