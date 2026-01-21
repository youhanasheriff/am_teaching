"use client";

import { useTranslations } from "next-intl";

export default function TermsOfService() {
  const tLegal = useTranslations("legal.termsOfService");
  const tUi = useTranslations("ui");

  return (
    <div className="container py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {tLegal("title")}
          </h1>
          <p className="text-lg text-gray-600">
            {tUi("lastUpdated")}{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {tLegal("agreementToTerms.title")}
            </h2>
            <p className="text-gray-700 mb-4">
              {tLegal("agreementToTerms.content1")}
            </p>
            <p className="text-gray-700">
              {tLegal("agreementToTerms.content2")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {tLegal("serviceDescription.title")}
            </h2>
            <p className="text-gray-700 mb-4">
              {tLegal("serviceDescription.content")}
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Individual and group English lessons</li>
              <li>IELTS preparation courses and practice sessions</li>
              <li>Educational resources and materials</li>
              <li>Online booking and scheduling systems</li>
              <li>Progress tracking and assessment tools</li>
              <li>Educational blog content and learning resources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts and Registration
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.1 Account Creation
            </h3>
            <p className="text-gray-700 mb-4">
              To access certain features, you must create an account and provide
              accurate, complete information. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              3.2 Account Security
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You are responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use strong passwords and keep them secure</li>
              <li>Do not share your account with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. User Responsibilities and Conduct
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              4.1 Acceptable Use
            </h3>
            <p className="text-gray-700 mb-4">
              You agree to use our services only for lawful purposes and in
              accordance with these Terms. You will not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of our services</li>
              <li>
                Use our services for commercial purposes without permission
              </li>
              <li>Impersonate others or provide false information</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              4.2 Student Responsibilities
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Attend scheduled lessons punctually</li>
              <li>Provide adequate notice for cancellations or rescheduling</li>
              <li>Maintain a respectful learning environment</li>
              <li>Complete assigned homework and practice exercises</li>
              <li>Communicate learning goals and challenges clearly</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Booking and Cancellation Policy
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              5.1 Lesson Booking
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                Lessons must be booked through our official booking system
              </li>
              <li>Payment is required at the time of booking</li>
              <li>Lesson times are confirmed upon successful payment</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              5.2 Cancellation and Rescheduling
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>Rescheduling is subject to instructor availability</li>
              <li>
                Late cancellations may result in forfeiture of lesson fees
              </li>
              <li>
                Emergency cancellations will be considered on a case-by-case
                basis
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Payment Terms
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              6.1 Pricing and Fees
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>All prices are clearly displayed on our website</li>
              <li>Prices may change with reasonable notice</li>
              <li>
                Payment is processed securely through third-party providers
              </li>
              <li>All fees are non-refundable unless otherwise specified</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              6.2 Refund Policy
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                Refunds are available for lessons cancelled with proper notice
              </li>
              <li>
                Technical issues preventing lesson delivery may qualify for
                refunds
              </li>
              <li>
                Refund requests must be submitted within 7 days of the lesson
              </li>
              <li>
                Processing time for approved refunds is 5-10 business days
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property Rights
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              7.1 Our Content
            </h3>
            <p className="text-gray-700 mb-4">
              All content on our website, including text, graphics, logos,
              images, and educational materials, is owned by AM Teachings and
              protected by intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              7.2 Limited License
            </h3>
            <p className="text-gray-700 mb-4">
              We grant you a limited, non-exclusive license to access and use
              our educational materials for personal learning purposes only. You
              may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Reproduce, distribute, or sell our materials</li>
              <li>Create derivative works based on our content</li>
              <li>Use our materials for commercial purposes</li>
              <li>Remove copyright or proprietary notices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our collection, use, and
              protection of your personal information is governed by our Privacy
              Policy, which is incorporated into these Terms by reference.
            </p>
            <p className="text-gray-700">
              By using our services, you consent to the collection and use of
              your information as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              9.1 Service Availability
            </h3>
            <p className="text-gray-700 mb-4">
              While we strive to provide reliable services, we cannot guarantee
              uninterrupted access. Our services are provided &ldquo;as
              is&rdquo; without warranties of any kind.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              9.2 Limitation of Damages
            </h3>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, AM Teachings shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Loss of profits or revenue</li>
              <li>Loss of data or information</li>
              <li>Business interruption</li>
              <li>Personal injury or property damage</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              9.3 Maximum Liability
            </h3>
            <p className="text-gray-700">
              Our total liability for any claims arising from these Terms or our
              services shall not exceed the amount you paid for the specific
              service giving rise to the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless AM Teachings, its
              instructors, and affiliates from any claims, damages, or expenses
              arising from your use of our services, violation of these Terms,
              or infringement of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Termination
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              11.1 Termination by You
            </h3>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by contacting us.
              Termination does not relieve you of any payment obligations for
              services already provided.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              11.2 Termination by Us
            </h3>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately if you
              violate these Terms or engage in conduct that we deem harmful to
              our services or other users.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              11.3 Effect of Termination
            </h3>
            <p className="text-gray-700">
              Upon termination, your right to use our services ceases
              immediately. Provisions that by their nature should survive
              termination will remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Dispute Resolution
            </h2>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              12.1 Informal Resolution
            </h3>
            <p className="text-gray-700 mb-4">
              Before pursuing formal legal action, we encourage you to contact
              us to seek a resolution of any disputes.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">
              12.2 Binding Arbitration
            </h3>
            <p className="text-gray-700">
              Any disputes that cannot be resolved informally shall be resolved
              through binding arbitration in accordance with applicable
              arbitration rules, rather than in court.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700">
              These Terms are governed by and construed in accordance with
              applicable laws. Any legal action or proceeding arising under
              these Terms will be brought exclusively in the appropriate courts,
              and you consent to the jurisdiction of such courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              14. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. We will
              notify users of material changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the updated Terms on our website</li>
              <li>Updating the &ldquo;Last updated&rdquo; date</li>
              <li>Sending email notifications for significant changes</li>
            </ul>
            <p className="text-gray-700">
              Your continued use of our services after changes become effective
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              15. Severability
            </h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable or
              invalid, the remaining provisions will continue to be valid and
              enforceable to the fullest extent permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              16. Entire Agreement
            </h2>
            <p className="text-gray-700">
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and AM Teachings regarding the use of
              our services and supersede all prior agreements and
              understandings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              17. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>AM Teachings</strong>
              </p>
              <p className="text-gray-700 mb-2">Email: legal@amteachings.com</p>
              <p className="text-gray-700 mb-2">
                General Contact: aya@amteachings.com
              </p>
              <p className="text-gray-700">
                Response Time: We aim to respond to all inquiries within 48
                hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
