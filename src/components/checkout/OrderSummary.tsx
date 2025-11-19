'use client';

export default function OrderSummary({
                                         pkg,
                                         onCheckout,
                                         loading,
                                     }: {
    pkg: any;
    onCheckout: () => void;
    loading: boolean;
}) {
    return (
        <div className="bg-btcl-gray-50 p-6 rounded-xl shadow-card text-btcl-gray-900">
            <h3 className="text-2xl font-semibold mb-6 text-btcl-primary">Order Summary</h3>
            <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-btcl-gray-200 rounded-lg" />
                <div>
                    <p className="font-bold text-lg">{pkg.name}</p>
                    <p className="text-sm text-btcl-gray-600">SMS: {pkg.sms}</p>
                </div>
            </div>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{pkg.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <hr className="border-btcl-gray-300" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>৳{pkg.price.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={onCheckout}
                disabled={loading}
                className="w-full bg-btcl-primary hover:bg-btcl-secondary text-white mt-8 py-3 rounded-xl font-semibold transition-colors duration-300 disabled:opacity-50"
                type="button"
            >
                {loading ? 'Processing...' : 'Checkout →'}
            </button>

            <p className="text-xs text-center mt-4 text-btcl-gray-500">
                By confirming the order, I accept the{' '}
                <a href="#" className="text-btcl-primary underline hover:text-btcl-secondary">
                    terms of the user agreement
                </a>
            </p>
        </div>
    );
}
