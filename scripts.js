document.addEventListener('DOMContentLoaded', function() {
    // Create the store count comparison chart
    createStoreCountChart();
    
    // Create the revenue comparison chart
    createRevenueChart();
    
    // Create the price comparison chart
    createPriceChart();
    
    // Create the growth comparison chart
    createGrowthChart();
    
    // Create the investment score chart
    createInvestmentScoreChart();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation for items when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .timeline-item, .comparison-card, .strength-item, .risk-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
            }
        });
    };
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Store Count Chart
function createStoreCountChart() {
    const data = [
        { company: "Mixue", stores: 32000, color: "#e91b1b" },
        { company: "Starbucks", stores: 7594, color: "#006241" }
    ];
    
    const width = document.getElementById('storeCountChart').clientWidth;
    const height = document.getElementById('storeCountChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    
    const svg = d3.select('#storeCountChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
        .domain(data.map(d => d.company))
        .range([0, width - margin.left - margin.right])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.stores) * 1.1])
        .range([height - margin.top - margin.bottom, 0]);
    
    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => `${d/1000}k`))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -(height - margin.top - margin.bottom) / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Number of Stores');
    
    // Animated bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.company))
        .attr('y', height - margin.top - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => d.color)
        .transition()
        .duration(1000)
        .attr('y', d => y(d.stores))
        .attr('height', d => height - margin.top - margin.bottom - y(d.stores));
    
    // Add labels on top of bars
    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.company) + x.bandwidth() / 2)
        .attr('y', d => y(d.stores) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => d3.format(',')(d.stores))
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);
}

// Revenue Chart
function createRevenueChart() {
    const data = [
        { company: "Mixue", revenue: 2.16, color: "#e91b1b" },
        { company: "Starbucks", revenue: 3.0, color: "#006241" }
    ];
    
    const width = document.getElementById('revenueChart').clientWidth;
    const height = document.getElementById('revenueChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    
    const svg = d3.select('#revenueChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
        .domain(data.map(d => d.company))
        .range([0, width - margin.left - margin.right])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue) * 1.1])
        .range([height - margin.top - margin.bottom, 0]);
    
    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => `$${d}B`))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -(height - margin.top - margin.bottom) / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Revenue (Billions USD)');
    
    // Animated bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.company))
        .attr('y', height - margin.top - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => d.color)
        .transition()
        .duration(1000)
        .attr('y', d => y(d.revenue))
        .attr('height', d => height - margin.top - margin.bottom - y(d.revenue));
    
    // Add labels on top of bars
    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.company) + x.bandwidth() / 2)
        .attr('y', d => y(d.revenue) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => `$${d.revenue}B`)
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);
}

// Price Chart
function createPriceChart() {
    const data = [
        { company: "Mixue", price: 0.8, color: "#e91b1b" },
        { company: "Starbucks", price: 4.9, color: "#006241" }
    ];
    
    const width = document.getElementById('priceChart').clientWidth;
    const height = document.getElementById('priceChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    
    const svg = d3.select('#priceChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
        .domain(data.map(d => d.company))
        .range([0, width - margin.left - margin.right])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price) * 1.1])
        .range([height - margin.top - margin.bottom, 0]);
    
    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => `$${d}`))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -(height - margin.top - margin.bottom) / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Average Price (USD)');
    
    // Animated bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.company))
        .attr('y', height - margin.top - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => d.color)
        .transition()
        .duration(1000)
        .attr('y', d => y(d.price))
        .attr('height', d => height - margin.top - margin.bottom - y(d.price));
    
    // Add labels on top of bars
    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.company) + x.bandwidth() / 2)
        .attr('y', d => y(d.price) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => `$${d.price}`)
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);
}

// Growth Chart
function createGrowthChart() {
    const data = [
        { company: "Mixue", growth: 30, color: "#e91b1b" },
        { company: "Starbucks", growth: 12, color: "#006241" }
    ];
    
    const width = document.getElementById('growthChart').clientWidth;
    const height = document.getElementById('growthChart').clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    
    const svg = d3.select('#growthChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
        .domain(data.map(d => d.company))
        .range([0, width - margin.left - margin.right])
        .padding(0.3);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.growth) * 1.1])
        .range([height - margin.top - margin.bottom, 0]);
    
    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => `${d}%`))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -(height - margin.top - margin.bottom) / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Annual Growth Rate (%)');
    
    // Animated bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.company))
        .attr('y', height - margin.top - margin.bottom)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => d.color)
        .transition()
        .duration(1000)
        .attr('y', d => y(d.growth))
        .attr('height', d => height - margin.top - margin.bottom - y(d.growth));
    
    // Add labels on top of bars
    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.company) + x.bandwidth() / 2)
        .attr('y', d => y(d.growth) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => `${d.growth}%`)
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);
}

// Investment Score Radar Chart
function createInvestmentScoreChart() {
    const data = [
        { axis: "Growth Potential", value: 0.9 },
        { axis: "Financial Stability", value: 0.85 },
        { axis: "Business Model", value: 0.8 },
        { axis: "Market Position", value: 0.95 },
        { axis: "Risk Assessment", value: 0.65 },
        { axis: "Global Expansion", value: 0.75 }
    ];
    
    const width = document.getElementById('investmentScoreChart').clientWidth;
    const height = document.getElementById('investmentScoreChart').clientHeight;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    const svg = d3.select('#investmentScoreChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`);
    
    // Create circular grid lines
    const levels = 5;
    const gridColor = "#CDCDCD";
    
    for (let level = 0; level < levels; level++) {
        const levelFactor = radius * ((level + 1) / levels);
        
        // Create grid circles
        svg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", levelFactor)
            .style("fill", "none")
            .style("stroke", gridColor)
            .style("stroke-width", "0.5px");
        
        // Add labels for each level
        svg.append("text")
            .attr("x", 5)
            .attr("y", -levelFactor + 5)
            .attr("class", "legend")
            .style("font-size", "10px")
            .style("fill", "#737373")
            .text((level + 1) * (10 / levels));
    }
    
    // Calculate angle for each axis
    const angleSlice = (Math.PI * 2) / data.length;
    
    // Create axes
    const axis = svg.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");
    
    // Create axis lines
    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", gridColor)
        .style("stroke-width", "1px");
    
    // Add axis labels
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => radius * 1.15 * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => radius * 1.15 * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d.axis)
        .call(wrap, 60);
    
    // Create the radar chart blobs
    // Convert data to coordinates
    function getPathCoordinates(dataValues) {
        const coordinates = [];
        dataValues.forEach((d, i) => {
            // Calculate position for each point
            coordinates.push({
                x: radius * d.value * Math.cos(angleSlice * i - Math.PI / 2),
                y: radius * d.value * Math.sin(angleSlice * i - Math.PI / 2)
            });
        });
        return coordinates;
    }
    
    // Create radar area
    const radarLine = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveLinearClosed);
    
    // Create radar path
    const coordinates = getPathCoordinates(data);
    
    // Add radar blob
    svg.append("path")
        .datum(coordinates)
        .attr("class", "radar-area")
        .attr("d", radarLine)
        .style("fill", "#e91b1b")
        .style("fill-opacity", 0.1)
        .style("stroke", "#e91b1b")
        .style("stroke-width", "2px")
        .style("stroke-opacity", 0)
        .transition()
        .duration(2000)
        .style("stroke-opacity", 1);
    
    // Add points at each axis
    svg.selectAll(".radar-point")
        .data(coordinates)
        .enter()
        .append("circle")
        .attr("class", "radar-point")
        .attr("r", 5)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("fill", "#e91b1b")
        .style("fill-opacity", 0.8)
        .style("stroke", "#fff")
        .style("stroke-width", "1px")
        .style("opacity", 0)
        .transition()
        .delay((d, i) => 2000 + 100 * i)
        .duration(500)
        .style("opacity", 1);
    
    // Add values at each point
    svg.selectAll(".value-text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "value-text")
        .attr("x", (d, i) => (radius * d.value * Math.cos(angleSlice * i - Math.PI / 2)) * 1.15)
        .attr("y", (d, i) => (radius * d.value * Math.sin(angleSlice * i - Math.PI / 2)) * 1.15)
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", "#333")
        .style("opacity", 0)
        .text(d => `${d.value * 10}/10`)
        .transition()
        .delay((d, i) => 2000 + 100 * i)
        .duration(500)
        .style("opacity", 1);
    
    // Function to wrap text on multiple lines
    function wrap(text, width) {
        text.each(function() {
            const text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                lineHeight = 1.1,
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy"));
            
            let line = [],
                lineNumber = 0,
                word,
                tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
            
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }
}