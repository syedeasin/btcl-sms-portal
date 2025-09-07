'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import { initiateSSLCommerzPayment } from '@/lib/api-client/payment';

export default function CheckoutModal({ pkg, isOpen, onClose }: any) {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        streetAddress: '',
        zipCode: '',
    });
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFormChange = (data: typeof formData) => {
        setFormData(data);
    };

    const handleSelectPayment = (method: string) => {
        setSelectedPayment(method);
    };

    const handleCheckout = async () => {
        if (!selectedPayment) {
            alert('Please select a payment method.');
            return;
        }

        if (
            !formData.firstName ||
            !formData.email ||
            !formData.streetAddress ||
            !formData.city ||
            !formData.phone
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        if (selectedPayment === 'SSLcommerz') {
            setLoading(true);
            try {
                const payload = {
                    idPackage: pkg.id,
                    idPartner: 182,
                    cusName: formData.firstName + ' ' + formData.lastName,
                    cusEmail: formData.email,
                    cusAdd1: formData.streetAddress,
                    cusCity: formData.city,
                    cusPostcode: formData.zipCode,
                    cusCountry: 'Bangladesh',
                    cusPhone: formData.phone,
                    productName: 'topUp',
                    productCategory: 'general',
                    productType: 'general',
                    topupNumber: '',
                    countryTopup: 'Bangladesh',
                    purchaseDate: null,
                    status: 'ACTIVE',
                    autoRenewalStatus: true,
                    price: null,
                    vat: 0,
                    ait: 0,
                    priority: 2,
                    discount: 0,
                    currency: 'BDT',
                    paid: 1,
                    total: pkg.price,
                    validity: 2592000,
                };

                const response = await initiateSSLCommerzPayment(payload);
                const redirectUrl = response.redirectUrl;

                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    alert('Payment URL not received. Please try again.');
                }
            } catch (error) {
                alert('Payment initiation failed.');
            } finally {
                setLoading(false);
            }
        } else {
            alert(`Payment method ${selectedPayment} is not supported yet.`);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50 font-bengali">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-6">
                <Dialog.Panel className="w-full max-w-5xl bg-white rounded-xl shadow-card p-8 flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-8 text-btcl-gray-900">Checkout</h2>
                        <CheckoutForm
                            formData={formData}
                            onFormChange={handleFormChange}
                            selectedPayment={selectedPayment}
                            onSelectPayment={handleSelectPayment}
                        />
                    </div>
                    <div className="w-full md:w-[380px]">
                        <OrderSummary
                            pkg={pkg}
                            onCheckout={handleCheckout}
                            loading={loading}
                        />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
