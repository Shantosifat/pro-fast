import React, { useState } from 'react';

const faqData = [
  {
    question: 'How does your delivery service work?',
    answer:
      'Once you place an order, we pick it up from the sender and deliver it directly to the recipient. You can track your parcel in real-time from pickup to delivery.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery time depends on the distance and service selected. We offer same-day, next-day, and standard delivery options.',
  },
  {
    question: 'Can I track my parcel?',
    answer:
      'Yes! All parcels come with a live tracking ID so you can monitor its journey every step of the way.',
  },
  {
    question: 'What happens if my parcel is damaged?',
    answer:
      'We ensure secure handling, but in case of damage, we offer compensation depending on the value and circumstances. Contact support immediately.',
  },
  {
    question: 'Is customer support available 24/7?',
    answer:
      'Absolutely. Our support center is open 24/7 to assist you with queries, concerns, or help with tracking.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 my-3 px-4 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 md:p-5 font-medium text-gray-800 flex justify-between items-center"
              >
                {faq.question}
                <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-5 pb-4 text-gray-600 text-sm border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
