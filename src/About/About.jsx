import React from 'react';

function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>
      <p>
        Welcome to the About Us page of Lok.IO! We are a team of passionate developers dedicated to providing you with the best experience on our platform.
      </p>
      <p>
        Our mission is to make sharing and discovering content easy and enjoyable. Whether you're a content creator or just browsing, we've got you covered.
      </p>
      <p>
        If you have any questions or feedback, feel free to <a href="/contact">contact us</a>. We'd love to hear from you!
      </p>
    </div>
  );
}

export default AboutPage;
