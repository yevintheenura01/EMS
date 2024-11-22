import React, { useState } from 'react';

// Title component
const Title = () => (
  <h1 className="text-left mb-5 text-2xl font-bold">Clothing Preferences</h1>
);

// Recursive component for categories with checkboxes
const Category = ({ name, subcategories = [], colors = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ml-5">
      <input type="checkbox" onClick={handleToggle} />
      <span className="cursor-pointer ml-2 font-semibold" onClick={handleToggle}>
        {name}
      </span>
      {isExpanded && (
        <div className="ml-5">
          {subcategories.map((subcategory, index) => (
            <Category key={index} name={subcategory.name} subcategories={subcategory.subcategories} colors={subcategory.colors} />
          ))}
          {colors.length > 0 && (
            <div className="ml-5">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label>{color}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Q1 = () => {
  const colorOptions = ["Black", "White", "Yellow", "Red", "Blue", "Green"];

  const categories = [
    {
      name: 'Tops',
      subcategories: [
        {
          name: 'T-shirts',
          subcategories: [
            { name: 'Solid', colors: colorOptions },
            { name: 'Graphic', colors: colorOptions },
            { name: 'Printed', colors: colorOptions },
            { name: 'Crew Neck', colors: colorOptions },
            { name: 'V-neck', colors: colorOptions },
          ],
        },
        {
          name: 'Blouses',
          subcategories: [
            { name: 'Button-up', colors: colorOptions },
            { name: 'Peasant', colors: colorOptions },
            { name: 'Wrap', colors: colorOptions },
            { name: 'Ruffled', colors: colorOptions },
            { name: 'Tailored', colors: colorOptions },
          ],
        },
        {
          name: 'Shirts',
          subcategories: [
            { name: 'Button-down', colors: colorOptions },
            { name: 'Oversized', colors: colorOptions },
            { name: 'Fitted', colors: colorOptions },
            { name: 'Tunic', colors: colorOptions },
          ],
        },
        {
          name: 'Sweaters',
          subcategories: [
            { name: 'Crew Neck' },
            { name: 'V-neck' },
            { name: 'Turtleneck' },
            { name: 'Cashmere' },
            { name: 'Wool' },
          ],
        },
        {
          name: 'Hoodies & Sweatshirts',
          subcategories: [
            { name: 'Zip-up' },
            { name: 'Pullover' },
            { name: 'Oversized' },
          ],
        },
        {
          name: 'Polo Tops',
          subcategories: [
            { name: 'Solid' },
            { name: 'Striped' },
            { name: 'Casual' },
          ],
        },
        {
          name: 'Tunics',
          subcategories: [
            { name: 'Longline' },
            { name: 'Flowy' },
            { name: 'Dressy' },
          ],
        },
      ],
    },
    {
      name: 'Bottoms',
      subcategories: [
        {
          name: 'Jeans',
          subcategories: [
            { name: 'Skinny' },
            { name: 'Straight' },
            { name: 'Wide-leg' },
            { name: 'High-waisted' },
            { name: 'Classic Fit' },
          ],
        },
        {
          name: 'Trousers',
          subcategories: [
            { name: 'Formal' },
            { name: 'Wide-leg' },
            { name: 'Tapered' },
            { name: 'Relaxed' },
          ],
        },
        {
          name: 'Leggings',
          subcategories: [
            { name: 'Plain' },
            { name: 'Faux Leather' },
            { name: 'Athletic' },
          ],
        },
        {
          name: 'Shorts',
          subcategories: [
            { name: 'Bermuda' },
            { name: 'Tailored' },
            { name: 'Relaxed Fit' },
          ],
        },
        {
          name: 'Skirts',
          subcategories: [
            { name: 'Mini' },
            { name: 'Midi' },
            { name: 'Maxi' },
            { name: 'A-line' },
            { name: 'Pencil' },
          ],
        },
      ],
    },
    {
      name: 'Dresses',
      subcategories: [
        {
          name: 'Casual Dresses',
          subcategories: [
            { name: 'Shift' },
            { name: 'Shirt Dress' },
            { name: 'A-line' },
            { name: 'Wrap' },
          ],
        },
        {
          name: 'Formal Dresses',
          subcategories: [
            { name: 'Evening Gown' },
            { name: 'Cocktail' },
            { name: 'A-line' },
            { name: 'Sheath' },
          ],
        },
        {
          name: 'Work Dresses',
          subcategories: [
            { name: 'Pencil' },
            { name: 'Sheath' },
            { name: 'Midi-length' },
            { name: 'Wrap' },
          ],
        },
        {
          name: 'Maxi Dresses',
          subcategories: [
            { name: 'Bohemian' },
            { name: 'Formal' },
            { name: 'Long-sleeve' },
          ],
        },
        {
          name: 'Day Dresses',
          subcategories: [
            { name: 'Fit-and-Flare' },
            { name: 'Flowy' },
            { name: 'Knit' },
          ],
        },
      ],
    },
    {
      name: 'Outerwear',
      subcategories: [
        {
          name: 'Jackets',
          subcategories: [
            { name: 'Denim' },
            { name: 'Bomber' },
            { name: 'Utility' },
            { name: 'Puffer' },
            { name: 'Leather' },
          ],
        },
        {
          name: 'Coats',
          subcategories: [
            { name: 'Trench' },
            { name: 'Wool' },
            { name: 'Pea Coat' },
            { name: 'Parka' },
            { name: 'Raincoat' },
          ],
        },
        {
          name: 'Blazers',
          subcategories: [
            { name: 'Structured' },
            { name: 'Oversized' },
            { name: 'Fitted' },
            { name: 'Single-button' },
          ],
        },
        {
          name: 'Cardigans',
          subcategories: [
            { name: 'Long' },
            { name: 'Cropped' },
            { name: 'Lightweight' },
            { name: 'Chunky Knit' },
          ],
        },
        {
          name: 'Vests',
          subcategories: [
            { name: 'Quilted' },
            { name: 'Denim' },
            { name: 'Longline' },
            { name: 'Dressy' },
          ],
        },
      ],
    },
    {
      name: 'Evening Wear',
      subcategories: [
        {
          name: 'Gowns',
          subcategories: [
            { name: 'Ball Gown' },
            { name: 'Mermaid' },
            { name: 'A-line' },
            { name: 'Sheath' },
          ],
        },
        {
          name: 'Party Dresses',
          subcategories: [
            { name: 'Midi' },
            { name: 'Sequin' },
            { name: 'Satin' },
            { name: 'Fit-and-Flare' },
          ],
        },
        {
          name: 'Ethnic Wear',
          subcategories: [
            { name: 'Sarees' },
            { name: 'Lehengas' },
            { name: 'Anarkali Suits' },
          ],
        },
        {
          name: 'Cocktail Dresses',
          subcategories: [
            { name: 'Fitted' },
            { name: 'Flowy' },
            { name: 'Asymmetrical' },
          ],
        },
      ],
    },
    {
      name: 'Accessories',
      subcategories: [
        {
          name: 'Bags',
          subcategories: [
            { name: 'Handbags' },
            { name: 'Backpacks' },
            { name: 'Crossbody' },
            { name: 'Totes' },
          ],
        },
        {
          name: 'Jewelry',
          subcategories: [
            { name: 'Earrings' },
            { name: 'Necklaces' },
            { name: 'Bracelets' },
            { name: 'Rings' },
            { name: 'Brooches' },
          ],
        },
        {
          name: 'Belts',
          subcategories: [
            { name: 'Leather' },
            { name: 'Woven' },
            { name: 'Chain' },
            { name: 'Statement' },
          ],
        },
        {
          name: 'Scarves',
          subcategories: [
            { name: 'Printed' },
            { name: 'Woolen' },
            { name: 'Silk' },
            { name: 'Cashmere' },
          ],
        },
        {
          name: 'Hats',
          subcategories: [
            { name: 'Beanie' },
            { name: 'Fedora' },
            { name: 'Wide-brim' },
            { name: 'Baseball Cap' },
          ],
        },
        {
          name: 'Sunglasses',
          subcategories: [
            { name: 'Round' },
            { name: 'Aviator' },
            { name: 'Cat-eye' },
            { name: 'Rectangular' },
          ],
        },
        {
          name: 'Watches',
          subcategories: [
            { name: 'Analog' },
            { name: 'Digital' },
            { name: 'Smartwatch' },
            { name: 'Dress Watch' },
          ],
        },
        {
          name: 'Hair Accessories',
          subcategories: [
            { name: 'Clips' },
            { name: 'Headbands' },
            { name: 'Barrettes' },
            { name: 'Scarves' },
          ],
        },
      ],
    },
    {
      name: 'Footwear',
      subcategories: [
        {
          name: 'Casual Shoes',
          subcategories: [
            { name: 'Sneakers' },
            { name: 'Loafers' },
            { name: 'Slip-ons' },
            { name: 'Comfort Shoes' },
          ],
        },
        {
          name: 'Formal Shoes',
          subcategories: [
            { name: 'Heels' },
            { name: 'Pumps' },
            { name: 'Loafers' },
            { name: 'Wedges' },
          ],
        },
        {
          name: 'Boots',
          subcategories: [
            { name: 'Ankle' },
            { name: 'Knee-high' },
            { name: 'Flat' },
            { name: 'Heeled' },
          ],
        },
        {
          name: 'Sandals',
          subcategories: [
            { name: 'Flat' },
            { name: 'Gladiator' },
            { name: 'Wedge' },
            { name: 'Orthopedic' },
          ],
        },
        {
          name: 'Slippers & Flip-Flops',
          subcategories: [
            { name: 'Indoor' },
            { name: 'Outdoor' },
            { name: 'Comfort' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="p-5">
      <Title />
      {categories.map((category, index) => (
        <Category key={index} name={category.name} subcategories={category.subcategories} />
      ))}
    </div>
  );
};

export default Q1;
