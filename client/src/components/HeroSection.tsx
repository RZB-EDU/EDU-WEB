import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Globe } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-32 lg:py-40">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">
              Discover Global Opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance">
            Your Gateway to Global{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Scholarships & Research
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with world-class universities, discover cutting-edge research opportunities, and find the perfect scholarship to fuel your academic journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/scholarships">
              <a>
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Scholarships
                </Button>
              </a>
            </Link>
            <Link href="/research">
              <a>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Research
                </Button>
              </a>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="card-minimal">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Smart Search</h3>
              <p className="text-sm text-muted-foreground">
                Find scholarships and research opportunities tailored to your profile
              </p>
            </div>

            <div className="card-minimal">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Research Hub</h3>
              <p className="text-sm text-muted-foreground">
                Access thousands of research papers from leading universities worldwide
              </p>
            </div>

            <div className="card-minimal">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-sm text-muted-foreground">
                Connect with universities and research institutions across the globe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
