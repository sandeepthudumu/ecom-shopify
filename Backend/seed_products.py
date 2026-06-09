import random
from app.database import SessionLocal
from app.models import Product

db = SessionLocal()

shirt_images = [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
]

tee_images = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
]

perfume_images = [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
]

products_data = [
    ("Classic White Oxford Shirt", "Oxford Shirts"),
    ("Sky Blue Oxford Shirt", "Oxford Shirts"),
    ("Navy Slim Fit Oxford Shirt", "Oxford Shirts"),
    ("Grey Formal Oxford Shirt", "Oxford Shirts"),
    ("Black Premium Oxford Shirt", "Oxford Shirts"),
    ("Striped Office Oxford Shirt", "Oxford Shirts"),
    ("Light Pink Oxford Shirt", "Oxford Shirts"),
    ("Beige Cotton Oxford Shirt", "Oxford Shirts"),

    ("Casual Denim Shirt", "Casual Shirts"),
    ("Olive Casual Shirt", "Casual Shirts"),
    ("Checked Casual Shirt", "Casual Shirts"),
    ("Black Casual Button Shirt", "Casual Shirts"),
    ("Cream Casual Shirt", "Casual Shirts"),
    ("Navy Casual Shirt", "Casual Shirts"),
    ("Printed Casual Shirt", "Casual Shirts"),
    ("Relaxed Fit Casual Shirt", "Casual Shirts"),
    ("Weekend Cotton Shirt", "Casual Shirts"),
    ("Urban Linen Blend Shirt", "Casual Shirts"),

    ("Beige Summer Linen Shirt", "Summer Wear"),
    ("White Resort Shirt", "Summer Wear"),
    ("Sky Blue Summer Shirt", "Summer Wear"),
    ("Pastel Green Summer Shirt", "Summer Wear"),
    ("Short Sleeve Vacation Shirt", "Summer Wear"),
    ("Floral Beach Shirt", "Summer Wear"),
    ("Lightweight Cotton Summer Shirt", "Summer Wear"),
    ("Relaxed Summer Camp Shirt", "Summer Wear"),

    ("Black Oversized Tee", "T-Shirts"),
    ("White Essential Tee", "T-Shirts"),
    ("Grey Heavyweight Tee", "T-Shirts"),
    ("Navy Crew Neck Tee", "T-Shirts"),
    ("Graphic Streetwear Tee", "T-Shirts"),
    ("Minimal Logo Tee", "T-Shirts"),
    ("Brown Oversized Tee", "T-Shirts"),
    ("Stone Wash Tee", "T-Shirts"),
    ("Athletic Fit Tee", "T-Shirts"),
    ("Premium Cotton Tee", "T-Shirts"),
    ("Relaxed Fit Tee", "T-Shirts"),
    ("Vintage Graphic Tee", "T-Shirts"),

    ("Noir Intense Perfume", "Perfumes"),
    ("Aqua Fresh Perfume", "Perfumes"),
    ("Royal Oud Perfume", "Perfumes"),
    ("Urban Musk Perfume", "Perfumes"),
    ("Citrus Wood Perfume", "Perfumes"),
    ("Amber Night Perfume", "Perfumes"),
    ("Ocean Blue Perfume", "Perfumes"),
    ("Classic Gentleman Perfume", "Perfumes"),
    ("Luxury Vanilla Perfume", "Perfumes"),
    ("Midnight Spice Perfume", "Perfumes"),
    ("Fresh Sport Perfume", "Perfumes"),
    ("Elegant Rose Perfume", "Perfumes"),
]

descriptions = {
    "Oxford Shirts": "Premium cotton oxford shirt designed for smart casual and formal styling.",
    "Casual Shirts": "Comfortable casual shirt crafted for everyday wear and relaxed styling.",
    "Summer Wear": "Lightweight breathable shirt designed for warm weather and vacation looks.",
    "T-Shirts": "Soft cotton tee designed for comfort, layering, and everyday streetwear.",
    "Perfumes": "Long-lasting fragrance with a refined scent profile for daily wear.",
}

price_ranges = {
    "Oxford Shirts": (2299, 3499),
    "Casual Shirts": (1799, 2999),
    "Summer Wear": (1599, 2799),
    "T-Shirts": (999, 1999),
    "Perfumes": (2999, 6999),
}

products = []

for name, category in products_data:
    if category == "Perfumes":
        image_url = random.choice(perfume_images)
    elif category == "T-Shirts":
        image_url = random.choice(tee_images)
    else:
        image_url = random.choice(shirt_images)

    min_price, max_price = price_ranges[category]

    products.append(
        Product(
            name=name,
            description=descriptions[category],
            price=random.randint(min_price, max_price),
            stock=random.randint(10, 80),
            category=category,
            image_url=image_url,
        )
    )

try:
    db.query(Product).delete()
    db.add_all(products)
    db.commit()
    print(f"{len(products)} custom products seeded successfully")

except Exception as e:
    db.rollback()
    print("Error while seeding products:", e)

finally:
    db.close()