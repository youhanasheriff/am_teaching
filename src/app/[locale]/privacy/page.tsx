'use client';

import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const tLegal = useTranslations('legal.privacyPolicy');
  const tUi = useTranslations('ui');
  
  return (
    <div className="container py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{tLegal('title')}</h1>
          <p className="text-lg text-gray-600">
            {tUi('lastUpdated')} {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{tLegal('introduction.title')}</h2>
            <p className="text-gray-700 mb-4">
              {tLegal('introduction.content1')}
            </p>
            <p className="text-gray-700">
              {tLegal('introduction.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{tLegal('informationCollection.title')}</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">{tLegal('informationCollection.personalTitle')}</h3>
            <p className="text-gray-700 mb-4">{tLegal('informationCollection.personalContent')}</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Educational background and learning goals</li>
              <li>Lesson preferences and scheduling information</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">{tLegal('informationCollection.automaticTitle')}</h3>
            <p className="text-gray-700 mb-4">{tLegal('informationCollection.automaticContent')}</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website information</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Providing and improving our educational services</li>
              <li>Processing payments and managing bookings</li>
              <li>Communicating with you about lessons and updates</li>
              <li>Personalizing your learning experience</li>
              <li>Analyzing website usage to improve our services</li>
              <li>Complying with legal obligations</li>
              <li>Protecting against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookie Usage</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website:
            </p>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">4.1 Types of Cookies</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
              <li><strong>Performance Cookies:</strong> Help us analyze website usage and improve performance</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Authentication Cookies:</strong> Keep you logged in to your account</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">4.2 Managing Cookies</h3>
            <p className="text-gray-700">
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Service Providers:</strong> Third-party services that help us operate our business (payment processors, email services, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> When you have given explicit consent for sharing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure payment processing through certified providers</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Account information is typically retained for the duration of your account plus a reasonable period thereafter.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>AM Teachings</strong></p>
              <p className="text-gray-700 mb-2">Email: privacy@amteachings.com</p>
              <p className="text-gray-700 mb-2">General Contact: aya@amteachings.com</p>
              <p className="text-gray-700">Response Time: We aim to respond to all privacy inquiries within 48 hours.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700">
              This Privacy Policy is governed by and construed in accordance with applicable data protection laws. Any disputes arising from this policy will be resolved in accordance with our Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}