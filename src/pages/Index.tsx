import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Star, Clock, Users, Award, ArrowRight, Utensils, Heart, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import heroImage from "@/assets/hero-thai-dishes.jpg";
import main_photo from '/main_photo.jpg'
// import restaurantInterior from "@/assets/restaurant-interior.jpg";
// import gong_on_fire from '/gong_on_fire.jpg'
import pic_01 from "../assets/pic_01.jpg"

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  is_active: boolean;
}

interface StatItem {
  id: string;
  icon_name: string;
  value: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

interface Feature {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

// Move these outside the component so they are not re-created on every render
const defaultFeatures = [
  {
    icon: Utensils,
    title: "Authentic Recipes",
    description: "Traditional Thai dishes passed down through generations"
  },
  {
    icon: Heart,
    title: "Fresh Ingredients",
    description: "Daily sourced premium ingredients for the perfect taste"
  },
  {
    icon: Globe,
    title: "Thai Culture",
    description: "Experience the warmth of Thai hospitality and tradition"
  }
];

const defaultStats = [
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Clock, value: "25+", label: "Years Experience" },
  { icon: Users, value: "10K+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Awards Won" }
];

const defaultTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    text: "The best Thai food I've ever had! The pad thai is absolutely incredible."
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 5,
    text: "Authentic flavors and amazing service. This place feels like Thailand!"
  },
  {
    id: "3",
    name: "Emma Davis",
    rating: 5,
    text: "Every dish is a masterpiece. The atmosphere is so warm and welcoming."
  }
];

const Index = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // For now, use default data since we don't have these tables yet
      // In a real implementation, you would fetch from database tables
      setFeatures(defaultFeatures.map((f, i) => ({ 
        id: `feature-${i}`, 
        icon_name: f.icon.name || 'Utensils', 
        title: f.title, 
        description: f.description, 
        display_order: i, 
        is_active: true 
      })));
      
      setStats(defaultStats.map((s, i) => ({ 
        id: `stat-${i}`, 
        icon_name: s.icon.name || 'Star', 
        value: s.value, 
        label: s.label, 
        display_order: i, 
        is_active: true 
      })));
      
      setTestimonials(defaultTestimonials.map(t => ({ ...t, is_active: true })));

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load page data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      Star,
      Clock,
      Users,
      Award,
      Utensils,
      Heart,
      Globe
    };
    return iconMap[iconName] || Utensils;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-thai-gold mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${main_photo})` }}
        >
          <div className="absolute inset-0 bg-fusion-dark/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to{" "}
              <span className="text-fusion-primary">AsianFusion</span>
            </h1>
            <p className="text-xl md:text-2xl text-fusion-neutral mb-8 leading-relaxed">
              Savour the authentic flavours

              of Thailand in Tauranga
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="btn-primary" size="xl" asChild>
                <Link to="/menu">
                  View Our Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button className="btn-accent" size="xl">
                <a href="https://www.ubereats.com/store/asian-fusion/SI3nHm9vUZOSRgWETTbP4w">Order Delivery</a>
              </Button>
              <Button className="btn-outline" size="xl">
                <a href="https://order.asianfusion.nz/products">Order Pickup</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-fusion-primary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-fusion-secondary/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-16 w-8 h-8 bg-fusion-accent/40 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-fusion-primary">AsianFusion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring you the authentic taste of Asia with every dish crafted to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon_name);
              return (
                <Card key={feature.id} className="card-elegant animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/*<section className="py-16 bg-thai-charcoal">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">*/}
      {/*      {stats.map((stat, index) => {*/}
      {/*        const IconComponent = getIcon(stat.icon_name);*/}
      {/*        return (*/}
      {/*          <div key={stat.id} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>*/}
      {/*            <div className="w-12 h-12 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">*/}
      {/*              <IconComponent className="h-6 w-6 text-thai-charcoal" />*/}
      {/*            </div>*/}
      {/*            <div className="text-3xl font-bold text-thai-gold mb-2">{stat.value}</div>*/}
      {/*            <div className="text-thai-beige-light text-sm">{stat.label}</div>*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* About Preview Section */}
      <section className="py-20 bg-fusion-primary-light/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-playfair text-4xl md:text-3xl font-bold text-foreground mb-6">
                Welcome to <span className="text-fusion-primary">AsianFusion @ the Mount</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our <span className="text-fusion-primary">Restaurant...</span>
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Located in Bethlehem within easy reach of motorways and major arterial routes,
                Asian Fusion brings the option of delivery or pick-up of delicious Thai food
                for Tauranga locals to enjoy at home. Our Thai chefs are experienced at creating
                exceptional dishes made of fresh and healthy ingredients. We hope to serve you soon!
              </p>
              <Button className="btn-primary" size="lg" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </div>
            <div className="animate-scale-in">
              <img
                  src={pic_01}
                  alt="AsianFusion Restaurant Interior"
                  className="rounded-lg shadow-large w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/*<section className="py-20 bg-fusion-secondary-light/20">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <div className="text-center mb-16 animate-fade-in-up">*/}
      {/*      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">*/}
      {/*        What Our <span className="text-fusion-primary">Customers Say</span>*/}
      {/*      </h2>*/}
      {/*      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">*/}
      {/*        Don't just take our word for it - hear from our satisfied customers*/}
      {/*      </p>*/}
      {/*    </div>*/}

      {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
      {/*      {testimonials.map((testimonial, index) => (*/}
      {/*        <Card key={testimonial.id} className="card-elegant animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>*/}
      {/*          <CardContent className="p-6">*/}
      {/*            <div className="flex mb-4">*/}
      {/*              {[...Array(testimonial.rating)].map((_, i) => (*/}
      {/*                <Star key={i} className="h-5 w-5 text-fusion-primary fill-current" />*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*            <p className="text-muted-foreground mb-4 italic">*/}
      {/*              "{testimonial.text}"*/}
      {/*            </p>*/}
      {/*            <div className="font-semibold text-foreground">*/}
      {/*              - {testimonial.name}*/}
      {/*            </div>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Asian Excellence?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Visit us today or order online for an authentic Asian dining experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-secondary" size="xl" asChild>
                <Link to="/menu">
                  View Menu
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
