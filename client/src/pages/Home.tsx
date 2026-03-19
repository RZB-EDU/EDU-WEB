import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Scholarships', value: '5,000+', icon: Award },
    { label: 'Universities', value: '2,000+', icon: Users },
    { label: 'Research Papers', value: '50,000+', icon: TrendingUp },
    { label: 'Active Users', value: '100,000+', icon: Zap },
  ];

  const featuredScholarships = [
    {
      id: 1,
      title: 'Fulbright Scholarship Program',
      country: 'USA',
      degree: 'Master\'s',
      funding: 'Fully Funded',
      description: 'Prestigious scholarship for international students pursuing advanced degrees',
    },
    {
      id: 2,
      title: 'Chevening Scholarships',
      country: 'UK',
      degree: 'Master\'s',
      funding: 'Fully Funded',
      description: 'Global scholarship program for future leaders and professionals',
    },
    {
      id: 3,
      title: 'Erasmus Mundus Scholarships',
      country: 'Europe',
      degree: 'Master\'s',
      funding: 'Partial',
      description: 'Joint degree programs across European universities',
    },
  ];

  const researchCategories = [
    { name: 'Natural Sciences', count: '8,500+', color: 'bg-primary/10' },
    { name: 'Engineering', count: '12,000+', color: 'bg-secondary/10' },
    { name: 'Health & Medicine', count: '15,000+', color: 'bg-primary/10' },
    { name: 'Social Sciences', count: '9,000+', color: 'bg-secondary/10' },
    { name: 'Arts & Humanities', count: '5,500+', color: 'bg-primary/10' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="section-padding">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">Featured Scholarships</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore some of the most prestigious scholarship opportunities available to students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="card-elevated group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{scholarship.title}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.country}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {scholarship.description}
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="badge-primary text-xs">{scholarship.degree}</span>
                  <span className="badge-secondary text-xs">{scholarship.funding}</span>
                </div>
                <Link href={`/scholarships/${scholarship.id}`}>
                  <a>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/scholarships">
              <a>
                <Button>Browse All Scholarships</Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="section-padding bg-card border-t border-b border-border">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">Research by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover cutting-edge research across diverse academic fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {researchCategories.map((category) => (
              <Link key={category.name} href={`/research?category=${category.name.toLowerCase().replace(/\s+/g, '_')}`}>
                <a className="no-underline">
                  <div className={`${category.color} p-6 rounded-lg border border-border hover:border-primary transition-all cursor-pointer group`}>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-2xl font-black text-primary">{category.count}</p>
                    <p className="text-xs text-muted-foreground mt-2">papers</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="bg-gradient-accent rounded-2xl p-12 sm:p-16 text-center">
            <h2 className="text-4xl font-black mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account to save scholarships, get personalized recommendations, and receive alerts about upcoming deadlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scholarships">
                <a>
                  <Button size="lg">
                    Explore Now
                  </Button>
                </a>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
