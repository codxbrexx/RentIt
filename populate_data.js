// Native fetch is available in Node 18+

const API_URL = 'http://localhost:3001/api';

const mockProperties = [
    {
        title: 'Luxury Villa with Pool',
        type: 'house',
        location: {
            address: '123 Palm Ave',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India'
        },
        price: { amount: 15000, period: 'day' },
        description: 'Beautiful villa with private pool and garden.',
        amenities: ['WiFi', 'Pool', 'Parking', 'AC'],
        images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
        category: 'house'
    },
    {
        title: 'Urban Loft in Bandra',
        type: 'house',
        location: {
            address: '45 Hill Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India'
        },
        price: { amount: 8000, period: 'day' },
        description: 'Modern loft in the heart of Bandra.',
        amenities: ['WiFi', 'AC', 'Kitchen'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        category: 'house'
    },
    {
        title: 'Royal Enfield Classic 350',
        type: 'vehicle',
        location: {
            address: 'Anjuna Bike Stand',
            city: 'Goa',
            state: 'Goa',
            country: 'India'
        },
        price: { amount: 1200, period: 'day' },
        description: 'Cruiser bike for exploring Goa in style. Excellent condition.',
        amenities: ['Helmet', 'Insurance'],
        images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c3d?w=800'],
        category: 'vehicle'
    },
    {
        title: 'DJI Mavic 3 Cine Premium',
        type: 'equipment',
        location: {
            address: 'Koramangala 4th Block',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India'
        },
        price: { amount: 4500, period: 'day' },
        description: 'Professional drone for cinematic shots. Comes with all accessories.',
        amenities: ['3 Batteries', 'ND Filters'],
        images: ['https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800'],
        category: 'equipment'
    },
    {
        title: 'Grand Wedding Lawn',
        type: 'event',
        location: {
            address: 'Chattarpur Farms',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India'
        },
        price: { amount: 150000, period: 'day' },
        description: 'Spacious lawn and banquet hall for grand weddings and events.',
        amenities: ['Catering', 'Decoration', 'Valet Parking'],
        images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'],
        category: 'event'
    }
];

async function main() {
    console.log('Starting population script...');

    // 1. Register User
    const userPayload = {
         email: 'host@example.com',
         password: 'password123',
         firstName: 'Host',
         lastName: 'User',
         phone: '9876543210'
    };

    console.log('Registering user...');
    let token = '';
    
    try {
        let res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload)
        });
        
        let data = await res.json();
        
        if (!res.ok) {
            if (res.status === 409) {
                 console.log('User already exists, logging in...');
                 res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userPayload.email, password: userPayload.password })
                });
                data = await res.json();
            } else {
                throw new Error(`Registration failed: ${JSON.stringify(data)}`);
            }
        }

        if (data.accessToken) {
            token = data.accessToken;
            console.log('Got access token');
        } else {
            throw new Error('No access token returned: ' + JSON.stringify(data));
        }

    } catch (e) {
        console.error('Auth error:', e.message);
        return;
    }

    // 2. Create Listings
    console.log('Creating listings...');
    for (const item of mockProperties) {
        const payload = {
            title: item.title,
            description: item.description,
            category: item.category,
            basePrice: item.price.amount,
            currency: 'INR',
            priceUnit: item.price.period,
            city: item.location.city,
            state: item.location.state,
            country: item.location.country,
            address: item.location.address,
            amenities: item.amenities,
            images: item.images.map(url => ({ url }))
        };

        try {
            const res = await fetch(`${API_URL}/listings`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                console.error(`Failed to create ${item.title}:`, JSON.stringify(err));
            } else {
                const created = await res.json();
                console.log(`Created listing: ${created.title} (${created.id})`);
                
                // Publish it immediately
                await fetch(`${API_URL}/listings/${created.id}/publish`, {
                     method: 'POST',
                     headers: { 'Authorization': `Bearer ${token}` }
                });
            }
        } catch (e) {
            console.error(`Error creating ${item.title}:`, e.message);
        }
    }

    console.log('Population complete!');
}

main();
