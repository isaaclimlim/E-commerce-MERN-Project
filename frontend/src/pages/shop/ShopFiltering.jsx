import React from 'react';

const ShopFiltering = ({ filters, filterState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
        <h3>Filters</h3>
        
        {/* categories */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Category</h4>
            <hr />
            {
                filters.categories.map((category) => (
                    <label key={category} className='capitalized'>
                        <input 
                          type="radio" 
                          name="category" 
                          id="category" 
                          value={category}
                          checked={filterState.category === category}
                          onChange={(e) => setFiltersState({ ...filterState, category: e.target.value })}
                        />
                        <span className='ml-1'>{category}</span>
                    </label>
                ))
            }
        </div>

        {/* colors */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Color</h4>
            <hr />
            {
                filters.colors.map((color) => (
                    <label key={color} className='capitalized'>
                        <input 
                          type="radio" 
                          name="color" 
                          id="color" 
                          value={color}
                          checked={filterState.color === color}
                          onChange={(e) => setFiltersState({ ...filterState, color: e.target.value })}
                        />
                        <span className='ml-1'>{color}</span>
                    </label>
                ))
            }
        </div>
        
        {/* pricing */}
        <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Price Range</h4>
            <hr />
            {
                filters.priceRanges.map((range) => (
                    <label key={range.label} className='capitalized'>
                        <input 
                          type="radio" 
                          name="priceRange" 
                          id="priceRanges" 
                          value={`${range.min} - ${range.max}`}
                          checked={filterState.priceRange === `${range.min} - ${range.max}`}
                          onChange={(e) => setFiltersState({ ...filterState, priceRange: e.target.value })}
                        />
                        <span className='ml-1'>{range.label}</span>
                    </label>
                ))
            }
        </div>
        {/* clear filters */}
        <button onClick={clearFilters}  className='bg-primary py-1 px-4 text-white rounded'>Clear all filters</button>

    </div>
  );
}

export default ShopFiltering;
