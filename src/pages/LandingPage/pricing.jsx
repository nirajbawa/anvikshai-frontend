import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: "Standard",
      price: "₹0",
      period: "Per Month",
      color: "from-orange-400 to-orange-600",
      features: [
        "4 Task Creation",
        "Progress Analytics",
        "AI-Powered Task Prioritization",
      ]
    },
    {
      name: "Premium",
      price: "₹499",
      period: "Per Month",
      color: "from-blue-500 to-blue-700",
      features: [
        "Everything in Standard",
        "20 Task Creation",
        "No Ads",
        
      ],
      popular: true
    }
  ];

  return (
    <section id="pricing" className="ml-20 mr-20 py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-title">
          Discover Your <span>Perfect Plan</span>
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Unlock the ability to add unlimited tasks to your roadmap while joining vibrant study groups for collaboration, support, and motivation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card relative ${plan.popular ? 'border-purple-500 border-2' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              
              <div className={`pricing-card-header bg-gradient-to-r ${plan.color} text-white p-6 -mx-8 -mt-8 rounded-t-2xl mb-8`}>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>
              
              <div className="pricing-card-price">
                {plan.price}
              </div>
              
              <div className="pricing-card-period">
                {plan.period}
              </div>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="pricing-feature">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={`mt-auto btn-${index === 0 ? 'secondary' : 'primary'}`}>
                Buy Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;