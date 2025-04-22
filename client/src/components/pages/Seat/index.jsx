import React, { useState } from 'react';

export default function TicketPricing() {
    const [activeTab, setActiveTab] = useState('standard');

    const seatTypes = [
        {
            id: 'standard',
            name: 'Ghế Thường',
            price: 65000,
            features: ['Ghế đơn tiêu chuẩn', 'Chất liệu nỉ cao cấp', 'Tầm nhìn tốt', 'Có giá để đồ uống'],
            image: 'https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png',
            color: 'blue',
        },
        {
            id: 'vip',
            name: 'Ghế VIP',
            price: 85000,
            features: [
                'Vị trí trung tâm tốt nhất',
                'Ghế rộng hơn ghế thường',
                'Đệm êm cao cấp',
                'Tựa tay rộng rãi',
                'Có giá để đồ uống cao cấp',
            ],
            image: 'https://i0.wp.com/therockandblues.com/wp-content/uploads/2018/05/vip.png?fit=1000%2C1000&ssl=1',
            color: 'blue',
        },
        {
            id: 'couple',
            name: 'Ghế Đôi',
            price: 250000,
            features: [
                'Sofa đôi cho hai người',
                'Không gian riêng tư',
                'Thiết kế không có tựa tay ở giữa',
                'Chất liệu da cao cấp',
                'Có thể điều chỉnh góc nghiêng',
                'Bàn đồ ăn riêng',
            ],
            image: 'https://png.pngtree.com/png-vector/20230107/ourmid/pngtree-golden-ticket-coupon-vip-pass-template-vector-illustration-can-be-used-png-image_6553062.png',
            color: 'red',
        },
    ];

    const colorClasses = {
        red: {
            bg: 'bg-red-600',
            bgLight: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-600',
            icon: 'text-red-500',
        },
        blue: {
            bg: 'bg-blue-600',
            bgLight: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-600',
            icon: 'text-blue-500',
        },
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto">
                        {seatTypes.map((seatType) => (
                            <button
                                key={seatType.id}
                                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                                    activeTab === seatType.id
                                        ? `${colorClasses[seatType.color].text} border-b-2 ${colorClasses[seatType.color].border}`
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => setActiveTab(seatType.id)}
                            >
                                {seatType.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {seatTypes.map(
                        (seatType) =>
                            activeTab === seatType.id && (
                                <div key={seatType.id} className="seat-details">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Image & Price */}
                                        <div className="md:w-1/3">
                                            <div className={`${colorClasses[seatType.color].bgLight} p-2 rounded-lg mb-4`}>
                                                <img
                                                    src={seatType.image}
                                                    alt={`Ghế ${seatType.name}`}
                                                    className="w-full rounded-lg"
                                                />
                                            </div>
                                            <div className={`${colorClasses[seatType.color].bg} text-white rounded-lg p-4 text-center`}>
                                                {seatType.id === 'couple' ? (
                                                    <>
                                                        <h3 className="text-xl font-bold">{formatPrice(seatType.price)}</h3>
                                                        <p className="text-sm opacity-80 mb-1">Giá cho 2 người</p>
                                                        <p className="text-xs opacity-70 italic">
                                                            ({formatPrice(seatType.price / 2)} / người)
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="text-xl font-bold">{formatPrice(seatType.price)}</h3>
                                                        <p className="text-sm opacity-80">Giá cơ bản</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="md:w-2/3">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-3">{seatType.name}</h2>

                                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                                <h3 className="font-semibold text-gray-700 mb-2">Tính năng ghế:</h3>
                                                <ul className="space-y-2">
                                                    {seatType.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <div className={`mr-2 ${colorClasses[seatType.color].icon} mt-1`}>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                            <span className="text-gray-600">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Note for couple seat */}
                                            {seatType.id === 'couple' && (
                                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <svg
                                                                className="h-5 w-5 text-red-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm text-red-700">
                                                                Ghế đôi được thiết kế cho 2 người. Giá vé hiển thị là tổng giá cho cả 2 người.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
