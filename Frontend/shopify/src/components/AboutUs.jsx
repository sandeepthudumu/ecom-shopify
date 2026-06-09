import React from "react";

function AboutUs() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            About Shopify Stores
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Thoughtful gifts, meaningful moments, and memorable experiences.
          </p>
        </div>

        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1512909006721-3d6018887383"
              alt="Gift Collection"
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Welcome to Shopify Stores
            </h2>

            <p className="text-gray-600 leading-8">
              At Shopify, we believe in the joy of giving and the art of
              thoughtful gifting. Our passion is to curate a collection of
              unique and meaningful gifts that speak volumes without saying a
              word.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              Whether you're celebrating a special occasion, expressing
              gratitude, or simply sharing a moment of joy, we have the perfect
              gift for every occasion.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">
              Gifts That Tell Stories
            </h2>

            <p className="text-gray-600 leading-8">
              What sets us apart is our commitment to providing a diverse range
              of handpicked items that go beyond the ordinary. We understand
              that every gift tells a story, and we strive to offer a selection
              that resonates with individual tastes and preferences.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              From stylish home décor and personalized accessories to gourmet
              treats and curated gift sets, our collection is designed to
              inspire and delight.
            </p>
          </div>

          <div className="order-1 md:order-2">
           <img
  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80"
  alt="Gift Story"
  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
/>
          </div>

        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          <div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Quality Gifts"
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Choose Shopify Stores?
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Curated Selection
                </h3>
                <p className="text-gray-600">
                  We carefully handpick gifts that stand out for their quality,
                  creativity, and uniqueness.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  Every product is selected with attention to detail to ensure
                  it meets our high standards.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Convenience
                </h3>
                <p className="text-gray-600">
                  Enjoy a seamless shopping experience with secure payments and
                  easy ordering.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Expressive Gifting
                </h3>
                <p className="text-gray-600">
                  Our gifts are designed to help you express love,
                  appreciation, gratitude, and celebration beautifully.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Closing Section */}
        <div className="bg-gray-100 rounded-3xl p-10 text-center">
          <h2 className="text-3xl text-black font-bold mb-6">
            Making Every Occasion Memorable
          </h2>

          <p className="text-gray-600 max-w-4xl mx-auto leading-8">
            At Shopify Stores, we take pride in being a part of your special
            moments. Join us on this journey of thoughtful gifting and make
            every occasion memorable. Thank you for choosing us as your
            go-to destination for the finest gifting experience.
          </p>

          <p className="mt-6 text-xl font-semibold text-gray-800">
            Happy Gifting! 🎁
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;