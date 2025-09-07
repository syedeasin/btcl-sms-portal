'use client';

export default function CheckoutForm({
                                         formData,
                                         onFormChange,
                                         selectedPayment,
                                         onSelectPayment,
                                     }: {
    formData: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        city: string;
        streetAddress: string;
        zipCode: string;
    };
    onFormChange: (data: any) => void;
    selectedPayment: string | null;
    onSelectPayment: (method: string) => void;
}) {
    const paymentMethods = ['MasterCard', 'VISA', 'SSLcommerz', 'Bkash', 'Nagad'];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <form className="space-y-8 text-btcl-gray-800" onSubmit={(e) => e.preventDefault()}>
            {/* Contact Information */}
            <fieldset className="space-y-4">
                <legend className="block text-lg font-semibold text-btcl-primary">
                    1. Contact Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary"
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary"
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary col-span-2 md:col-span-1"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary col-span-2 md:col-span-1"
                    />
                </div>
            </fieldset>

            {/* Address */}
            <fieldset className="space-y-4">
                <legend className="block text-lg font-semibold text-btcl-primary">2. Address</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary"
                    >
                        <option value="">City</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                    </select>
                    <input
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary"
                    />
                    <input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                        className="border border-btcl-gray-300 rounded-md px-4 py-2 text-btcl-gray-700 focus:outline-none focus:ring-2 focus:ring-btcl-primary"
                    />
                </div>
            </fieldset>

            {/* Payment Methods */}
            <fieldset className="space-y-4">
                <legend className="block text-lg font-semibold text-btcl-primary">3. Payment method</legend>
                <div className="grid grid-cols-4 gap-4 mt-2">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedPayment === method;
                        return (
                            <button
                                key={method}
                                type="button"
                                onClick={() => onSelectPayment(method)}
                                className={`
                  rounded-md py-2 text-center font-semibold
                  transition-colors duration-300
                  border
                  ${
                                    isSelected
                                        ? 'bg-btcl-primary border-btcl-primary text-white'
                                        : 'bg-white border-btcl-gray-300 text-btcl-gray-700 hover:bg-btcl-primary hover:text-white'
                                }
                `}
                                aria-pressed={isSelected}
                                aria-label={method}
                            >
                                {method}
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </form>
    );
}
