import React from 'react';
import { Sparkles, Palette, Copy, Image, Wand2, Globe, ChevronRight, Zap, Languages, LayoutGrid, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserGuide } from './UserGuide';
interface HomePageProps {
  onStart: () => void;
}
export const HomePage: React.FC<HomePageProps> = ({
  onStart
}) => {
  const steps = [{
    icon: Palette,
    title: 'Select Design Factors',
    desc: 'Choose from 900+ design options with Quick Presets or randomize for inspiration'
  }, {
    icon: Sparkles,
    title: 'Customize Layout',
    desc: 'Pick Single, Front & Back, Full 360° View, or 4 Kurti variations'
  }, {
    icon: Copy,
    title: 'Copy & Generate',
    desc: 'Get your prompt in English or Hindi and paste into any AI image tool'
  }];
  const features = [{
    icon: Wand2,
    title: 'No AI Knowledge Needed',
    desc: 'We handle the prompt engineering for you'
  }, {
    icon: LayoutGrid,
    title: '4 Layout Modes',
    desc: 'Single, Front & Back, Full View, or 4 Variations'
  }, {
    icon: Palette,
    title: '900+ Design Options',
    desc: '500+ motifs and comprehensive ethnic wear library'
  }, {
    icon: Zap,
    title: 'Quick Presets',
    desc: 'Instant setups for Wedding, Festive, Office & more'
  }, {
    icon: Languages,
    title: 'Bilingual Support',
    desc: 'Generate prompts in English or Hindi'
  }, {
    icon: Globe,
    title: 'Works Everywhere',
    desc: 'Compatible with all AI image generators'
  }];
  return <div className="min-h-screen">
    {/* Hero Section */}
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-rose opacity-5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>900+ Design Options • 500+ Motifs</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-tight">
            Create Perfect AI Prompts for Kurti Design
          </h1>

          <p className="text-lg md:text-xl mb-8 leading-relaxed text-[#593648]/[0.97]">
            Generate detailed, professional prompts for any AI image generator
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={onStart} className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
              Start Designing
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <UserGuide
              trigger={
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto gap-2">
                  <BookOpen className="w-5 h-5" />
                  Full Guide
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>

    {/* What's New Section */}
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="text-3xl font-bold text-center">
            Upcoming Features <span className="text-lg font-normal text-muted-foreground block sm:inline">(Our Future Plan)</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Image Generation</h3>
                  <p className="text-muted-foreground">
                    Now you can generate designs directly on our platform! Experience the power of AI generation integrated seamlessly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => <div key={index} className="relative">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-rose flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>

            {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ChevronRight className="w-8 h-8 text-muted-foreground/30" />
            </div>}
          </div>)}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Use Kurti Prompt Studio?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
            <CardContent className="pt-6 pb-4 px-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </CardContent>
          </Card>)}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Design Your Perfect Kurti?</h2>
        <p className="text-muted-foreground mb-8">Start creating professional AI prompts in minutes</p>
        <Button size="lg" onClick={onStart} className="px-8">
          Start Designing
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  </div>;
};