import React, { useState } from "react";
import {
  faCheck,
  faTimes,
  faStar,
  faRocket,
  faBuilding,
  faQuestionCircle,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import clickSound from "../assets/click.wav";

const Pricing = () => {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch((e) => console.log("Click sound failed:", e));
  };
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activePlan, setActivePlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: faStar,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for personal use and small projects",
      popular: false,
      features: [
        { text: "1,000 API requests per day", included: true },
        { text: "Current weather data", included: true },
        { text: "5-day forecast", included: true },
        { text: "Basic weather maps", included: true },
        { text: "Community support", included: true },
        { text: "Historical data", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Priority support", included: false },
        { text: "Custom integrations", included: false },
      ],
      cta: "Get Started Free",
      color: "primary",
    },
    {
      id: "pro",
      name: "Professional",
      icon: faRocket,
      price: { monthly: 29, yearly: 290 },
      description: "Ideal for developers and growing businesses",
      popular: true,
      features: [
        { text: "50,000 API requests per day", included: true },
        { text: "Current weather data", included: true },
        { text: "16-day forecast", included: true },
        { text: "Advanced weather maps", included: true },
        { text: "Historical data (1 year)", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Email support", included: true },
        { text: "Custom integrations", included: false },
        { text: "Dedicated account manager", included: false },
      ],
      cta: "Start Free Trial",
      color: "secondary",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: faBuilding,
      price: { monthly: 99, yearly: 990 },
      description: "For large organizations with custom needs",
      popular: false,
      features: [
        { text: "Unlimited API requests", included: true },
        { text: "All weather data types", included: true },
        { text: "30-day forecast", included: true },
        { text: "Premium weather maps", included: true },
        { text: "Historical data (5 years)", included: true },
        { text: "Advanced analytics & reports", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      color: "accent",
    },
  ];

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, our Professional plan comes with a 14-day free trial. No credit card required to start with the Free plan.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Absolutely! We offer 50% discount for registered non-profit organizations. Contact our sales team for verification.",
    },
    {
      question: "How are API requests counted?",
      answer:
        "Each call to our weather API counts as one request. This includes current weather, forecasts, historical data, and map tiles.",
    },
    {
      question: "What happens if I exceed my API limit?",
      answer:
        "We'll notify you when you're approaching your limit. If exceeded, additional requests will return an error until the next billing cycle.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-primary-50 to-primary-100 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-xl md:text-4xl font-bold text-primary-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm md:text-xl text-primary-700 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your weather data needs. All plans
            include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span
              className={`md:text-lg text-sm font-medium ${
                billingCycle === "monthly"
                  ? "text-primary-800"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <motion.div
              onClick={playClickSound}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "yearly" : "monthly"
                  )
                }
                className="relative inline-flex md:h-6 h-3 md:w-11 w-8 items-center rounded-full bg-primary-600 transition-colors focus:outline-none"
              >
                <motion.span
                  onClick={playClickSound}
                  className={`inline-block md:h-4 h-2 md:w-4 w-2 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </motion.div>
            <div className="flex items-center space-x-2">
              <span
                className={`md:text-lg text-sm font-medium ${
                  billingCycle === "yearly"
                    ? "text-primary-800"
                    : "text-gray-500"
                }`}
              >
                Yearly
              </span>
              <motion.span
                className="bg-accent-100 text-accent-800 text-xs font-semibold px-2 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Save up to 17%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                plan.popular
                  ? "border-secondary-500 shadow-xl"
                  : "border-primary-100"
              }`}
              variants={{ ...itemVariants, ...cardHover }}
              whileHover="hover"
              custom={index}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white md:px-6 px-3 md:py-2 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className={`md:w-16 md:h-16 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      plan.color === "primary"
                        ? "bg-primary-100"
                        : plan.color === "secondary"
                        ? "bg-secondary-100"
                        : "bg-accent-100"
                    }`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={plan.icon}
                      className={`text-2xl ${
                        plan.color === "primary"
                          ? "text-primary-600"
                          : plan.color === "secondary"
                          ? "text-secondary-600"
                          : "text-accent-600"
                      }`}
                    />
                  </motion.div>
                  <h3 className="md:text-2xl text-lg font-bold text-primary-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-primary-700 md:text-sm text-xs">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center space-x-1">
                    <motion.span
                      className="md:text-4xl text-xl font-bold text-primary-900"
                      key={`${plan.id}-${billingCycle}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      $
                      {billingCycle === "monthly"
                        ? plan.price.monthly
                        : plan.price.yearly}
                    </motion.span>
                    {plan.price.monthly > 0 && (
                      <span className="text-primary-700">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {plan.price.monthly > 0 && billingCycle === "yearly" && (
                    <motion.div
                      className="text-secondary-600 md:text-sm text-xs font-semibold mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Save ${plan.price.monthly * 12 - plan.price.yearly} per
                      year
                    </motion.div>
                  )}
                  {plan.price.monthly === 0 && (
                    <div className="text-primary-700 text-sm mt-1">
                      Forever free
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start md:space-x-3 space-x-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.05 + index * 0.1 }}
                    >
                      {feature.included ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-secondary-500 mt-1 flex-shrink-0"
                          />
                        </motion.div>
                      ) : (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                      )}
                      <span
                        className={`md:text-sm text-xs ${
                          feature.included
                            ? "text-primary-800"
                            : "text-gray-500"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.div
                  onClick={playClickSound}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.button
                    onClick={() => setActivePlan(plan.id)}
                    className={`w-full md:py-3 py-2 md:px-6 px-2 rounded-lg md:text-lg text-sm font-semibold transition-all duration-200 shadow-lg ${
                      plan.popular
                        ? "bg-secondary-600 hover:bg-secondary-700 text-white hover:shadow-xl"
                        : plan.id === "free"
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-accent-600 hover:bg-accent-700 text-white"
                    }`}
                    whileHover={{
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                      y: -2,
                    }}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-primary-100 md:p-8 py-3 px-2 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="md:text-2xls text-xl font-bold text-primary-900 text-center mb-8">
            Compare Plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full md:text-[16px] text-[8px]">
              <thead>
                <tr className="border-b-2 border-primary-200">
                  <th className="text-left md:py-4 py-2 md:px-6 px-2 text-primary-800 font-semibold">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className="text-center md:py-4 py-2 md:px-6 px-2 font-semibold"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "API Requests",
                    free: "1,000/day",
                    pro: "50,000/day",
                    enterprise: (
                      <FontAwesomeIcon
                        icon={faInfinity}
                        className="text-accent-600"
                      />
                    ),
                  },
                  {
                    feature: "Forecast Days",
                    free: "5 days",
                    pro: "16 days",
                    enterprise: "30 days",
                  },
                  {
                    feature: "Historical Data",
                    free: (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-gray-400"
                      />
                    ),
                    pro: "1 year",
                    enterprise: "5 years",
                  },
                  {
                    feature: "Support",
                    free: "Community",
                    pro: "Email",
                    enterprise: "24/7 Priority",
                  },
                  {
                    feature: "SLA Guarantee",
                    free: (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-gray-400"
                      />
                    ),
                    pro: "99.5%",
                    enterprise: "99.9%",
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-primary-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="md:py-4 py-2 md:px-6 px-2 text-primary-700 font-medium">
                      {row.feature}
                    </td>
                    <td className="text-center md:py-4 py-2 md:px-6 px-2">
                      {row.free}
                    </td>
                    <td className="text-center md:py-4 py-2 md:px-6 px-2">
                      {row.pro}
                    </td>
                    <td className="text-center md:py-4 py-2 md:px-6 px-2">
                      {row.enterprise}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-primary-100 md:p-8 p-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="md:text-2xl text-lg font-bold text-primary-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-primary-50 rounded-lg md:p-6 p-3 border border-primary-200"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgb(6, 182, 212)",
                  boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.1)",
                }}
              >
                <div className="flex items-start space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="text-primary-600 mt-1 flex-shrink-0"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-2 md:text-[16px] text-[12px]">
                      {faq.question}
                    </h3>
                    <p className="text-primary-700 md:text-sm text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl md:p-8 p-3 text-white shadow-2xl"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="md:text-2xl text-lg font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 md:text-[14px] text-xs mb-6 max-w-2xl mx-auto">
              Join thousands of developers and businesses who trust our weather
              data. Start with our free plan and upgrade when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={playClickSound}
                className="bg-white text-primary-600 font-semibold md:text-[16px] text-[12px] px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Plan
              </motion.button>
              <motion.button
                onClick={playClickSound}
                className="border border-white text-white md:text-[16px] text-[12px] font-semibold px-8 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating background elements */}
        <motion.div
          className="absolute left-10 top-1/4 w-16 h-16 bg-secondary-200 rounded-full blur-xl opacity-30 -z-10"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-20 bottom-1/4 w-12 h-12 bg-accent-200 rounded-full blur-lg opacity-40 -z-10"
          animate={{
            y: [0, 15, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Pricing;
