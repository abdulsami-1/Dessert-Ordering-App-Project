let btn = document.querySelectorAll('.item button');

let body = document.querySelector('body');
let cartElement = document.querySelector('.cart');
let contentCart;
let orderInformation;

let totalItems = 0;

let item = document.querySelectorAll('.item');

let counter = 0;

let cartItemNames = []; 

const handler = function () {
    let clickedBtn = this;
    clickedBtn.style.backgroundColor = '#C93A0E';
    clickedBtn.disabled = true; 

    const itemDiv = this.closest('.item');
    const imgContainer = itemDiv.querySelector('.img');
    if (imgContainer) {
        imgContainer.style.cssText = `
            border: 2px solid #C93A0E;
            border-radius: 17px;
            overflow: hidden;
            transition: border-color 0.3s ease;
        `;
    }

    const name = itemDiv.querySelector('.info span').textContent;
    const price = parseFloat(itemDiv.querySelector('.info h4').textContent.replace('$', '')).toFixed(2);

    let quantityControl = clickedBtn.querySelector('div');
    if (quantityControl) {
        const quantityDisplay = quantityControl.querySelector('p');
        if (quantityDisplay) {
            const currentQuantity = parseInt(quantityDisplay.innerText) + 1;
            quantityDisplay.innerText = currentQuantity;
            clickedBtn.innerText = `${currentQuantity}x`; 
        }
    } else {
        totalItems++;
        clickedBtn.innerText = '1x'; 

        let btn1 = document.createElement('div');
        let btn2 = document.createElement('div');
        let divBox = document.createElement('div');
        let p = document.createElement('p');

        divBox.style.height = '18px';
        divBox.style.width = '128px';
        divBox.style.display = 'flex';
        divBox.style.justifyContent = 'space-between';
        divBox.style.alignItems = 'center';
        divBox.style.marginRight = '0.8rem';

        p.innerText = '1';
        p.style.color = 'white';
        p.style.margin = '0';
        p.style.height = '100%';
        p.style.width = '14%';
        p.style.padding = '0.1rem';
        p.style.textAlign = 'center';

        btn1.style.height = '100%';
        btn1.style.width = '15%';
        btn1.style.cursor = 'pointer';
        btn1.classList.add('btnInc');
        btn1.style.backgroundSize = 'cover';
        btn1.style.border = 'none';
        btn1.style.backgroundColor = 'transparent';
        btn1.style.borderRadius = '50%';
        btn1.style.border = '1px solid white';
        btn1.innerHTML = "<img src='icon-increment-quantity.svg'>";
        let img1 = btn1.querySelector('img');
        img1.classList.add('increment-icon');
        img1.style.height = '80%';
        img1.style.width = '80%';
        img1.style.padding = '0.1rem';
        btn1.addEventListener('click', function () {
            increment.call(this, clickedBtn); 
        });
        btn1.addEventListener('mouseenter', function () {
            btn1.style.backgroundColor = 'white'; 
            const img = btn1.querySelector('img'); 
            if (img) {
                img.style.filter = 'invert(24%) sepia(91%) saturate(7471%) hue-rotate(356deg) brightness(96%) contrast(105%)'; 
            }
        });
        btn1.addEventListener('mouseleave', function () {
            btn1.style.backgroundColor = ''; 
            const img = btn1.querySelector('img'); 
            if (img) {
                img.style.filter = ''; 
            }
        });

        btn2.innerHTML = "<img src='icon-decrement-quantity.svg'>";
        btn2.style.height = '100%';
        btn2.style.width = '15%';
        btn2.classList.add('btnDec');
        btn2.style.backgroundColor = 'pink';
        btn2.style.margin = '0';
        btn2.style.cursor = 'pointer';
        btn2.style.border = '1px solid white';
        btn2.style.backgroundSize = 'cover';
        btn2.style.backgroundColor = 'transparent';
        btn2.style.borderRadius = '50%';
        let img2 = btn2.querySelector('img');
        img2.classList.add('decrement-icon');
        img2.style.height = '80%';
        img2.style.width = '80%';
        img2.style.padding = '0.1rem';
        btn2.addEventListener('click', function () {
            decrement.call(this, clickedBtn); 
        });
        btn2.addEventListener('mouseenter', function () {
            btn2.style.backgroundColor = 'white'; 
            const img = btn2.querySelector('img'); 
            if (img) {
                img.style.filter = 'invert(24%) sepia(91%) saturate(7471%) hue-rotate(356deg) brightness(96%) contrast(105%)'; 
            }
        });
        
        btn2.addEventListener('mouseleave', function () {
            btn2.style.backgroundColor = ''; 
            const img = btn2.querySelector('img'); 
            if (img) {
                img.style.filter = ''; 
            }
        });
        if (!contentCart) {
            cartUpdated();
        }

        divBox.appendChild(btn1);
        divBox.appendChild(p);
        divBox.appendChild(btn2);

        clickedBtn.appendChild(divBox);

        OrderInfo(clickedBtn, name, price);
    }
    updateDisplay();
};

function updateDisplay() {
    const cartHeading = cartElement.querySelector('h2'); 
    if (cartHeading) {
        cartHeading.innerText = `Your Cart (${totalItems})`; 
    }
    
    const cartTextElement = cartElement.querySelector('.content p'); 
    if (cartTextElement) {
        if (cartItemNames.length > 0) {
            cartTextElement.innerText = cartItemNames[0]; 
        } else {
            cartTextElement.innerText = `Your added items will appear here`; 
        }
        cartTextElement.style.display = cartItemNames.length > 0 || totalItems > 0 ? 'block' : 'block'; 
    }
}


function initializeButtons() {
    const buttons = document.querySelectorAll('.item button');
    buttons.forEach(button => {
        
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        
        newButton.addEventListener('click', handler);
    });
}



function increment() {
    const itemDiv = this.closest('.item');
    const name = itemDiv.querySelector('.info span').textContent;

    const orderInfoItem = Array.from(document.querySelectorAll('.order-Info-main'))
        .find(el => el.querySelector('.OrderName')?.textContent === name);

    if (!orderInfoItem) return;

    const quantityElement = orderInfoItem.querySelector('.quantity');
    const priceElement = orderInfoItem.querySelector('.itemsPrice');
    const unitPrice = parseFloat(orderInfoItem.querySelector('.oneitemPrice').textContent.replace('@ $', ''));

    let currentQuantity = parseInt(quantityElement.textContent.replace('x', '')) || 1;
    currentQuantity += 1;

    
    quantityElement.textContent = `${currentQuantity}x`;
    priceElement.textContent = `$${(unitPrice * currentQuantity).toFixed(2)}`;

    
    const counterDisplay = itemDiv.querySelector('button div p');
    if (counterDisplay) {
        counterDisplay.innerText = currentQuantity;
    }

    totalItems++;
    updateCartTotal();
    updateDisplay();
}


function decrement() {
    const itemDiv = this.closest('.item');
    const name = itemDiv.querySelector('.info span').textContent;

    const orderInfoItem = Array.from(document.querySelectorAll('.order-Info-main'))
        .find(el => el.querySelector('.OrderName')?.textContent === name);

    if (!orderInfoItem) return;

    const quantityElement = orderInfoItem.querySelector('.quantity');
    const priceElement = orderInfoItem.querySelector('.itemsPrice');
    const unitPrice = parseFloat(orderInfoItem.querySelector('.oneitemPrice').textContent.replace('@ $', ''));

    let currentQuantity = parseInt(quantityElement.textContent.replace('x', ''));

    if (currentQuantity > 1) {
        currentQuantity--;
        
        quantityElement.textContent = `${currentQuantity}x`;
        priceElement.textContent = `$${(unitPrice * currentQuantity).toFixed(2)}`;

        
        const counterDisplay = itemDiv.querySelector('button div p');
        if (counterDisplay) {
            counterDisplay.innerText = currentQuantity;
        }

        totalItems--;
        updateCartTotal();
        updateDisplay();
    } else {
        removeItem(orderInfoItem, name);
    }
}

function updateCartItemQuantity(orderInfoItem, change) {
    const quantitySpan = orderInfoItem.querySelector('p');
    if (quantitySpan) {
        let currentQuantity = parseInt(quantitySpan.innerText);
        currentQuantity += change;
        quantitySpan.innerText = currentQuantity;
        const oneitemPriceSpan = orderInfoItem.querySelector('.oneitemPrice');
        const itemsPriceSpan = orderInfoItem.querySelector('.itemsPrice');
        if (oneitemPriceSpan && itemsPriceSpan) {
            const unitPrice = parseFloat(oneitemPriceSpan.innerText.replace('@ $', ''));
            itemsPriceSpan.innerText = ` $ ${(unitPrice * currentQuantity).toFixed(2)}`;
            updateCartTotal();
        }
    }
}

function resetButtonStyles(button) {
    button.style.padding = '';
    button.style.fontSize = '';
    button.style.fontWeight = '';
    button.style.backgroundColor = '';
    button.style.color = '';
    button.style.border = '';
}

function resetAddToCartButton(itemName, originalButton) {
    
    originalButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
    originalButton.disabled = false; 
    originalButton.style = ''; 

    
    const quantityControl = originalButton.querySelector('div');
    if (quantityControl) {
        originalButton.removeChild(quantityControl);
    }

    
    const index = cartItemNames.indexOf(itemName);
    if (index > -1) {
        cartItemNames.splice(index, 1);
    }

    
    const newButton = originalButton.cloneNode(true);
    originalButton.parentNode.replaceChild(newButton, originalButton);

    
    newButton.addEventListener('click', handler);

    
    updateDisplay();
    updateCartHeight(); 
}

function cartUpdated() {
    contentCart = document.querySelector('.content');
    const cart = document.querySelector('.cart');
    const cartTextElement = cartElement.querySelector('p');

    if (cartTextElement) {
        cartTextElement.style.display = 'none';
    }

    contentCart.innerText = '';
    
    contentCart.classList.add('content-cart');

    const divBox = document.createElement('div');
    const divInner1 = document.createElement('div');
    const divInner2 = document.createElement('div');
    const btnConfirm = document.createElement('button');

    divBox.classList.add('Order-info');
    orderInformation = divBox;

    divInner1.classList.add('list-info-1');
    divInner2.classList.add('list-info-2');
    btnConfirm.classList.add('btn-Confirm');

    contentCart.appendChild(divBox);
    contentCart.appendChild(divInner1);
    contentCart.appendChild(divInner2);
    contentCart.appendChild(btnConfirm);

    deliveryInfo(divInner2);
    totalOrder(divInner1);
    confirmBtn(btnConfirm);
}

function totalOrder(innerElement) {
    const h2 = document.createElement('span');
    const span = document.createElement('span');

    span.classList.add('span-total');
    h2.classList.add('total-price');
    h2.setAttribute('id', 'cart-total-price');

    span.innerText = 'Order Total';
    h2.innerText = '$0.00';

    innerElement.appendChild(span);
    innerElement.appendChild(h2);
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.order-Info-main');
    let total = 0;

    cartItems.forEach(item => {
        const priceText = item.querySelector('.itemsPrice')?.textContent.replace('$', '').trim();

        
        const price = parseFloat(priceText);

        if (!isNaN(price)) {
            total += price;
        }
    });

    
    const totalPriceElement = document.querySelector('#cart-total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `$${total.toFixed(2)}`;
    }
}

function deliveryInfo(element) {
    const span = document.createElement('span');
    const img = document.createElement('img');

    img.setAttribute('src', './assets/images/icon-carbon-neutral.svg');
    span.innerHTML = 'This is a <strong><b>carbon-neutral</b></strong> delivery';

    element.appendChild(img);
    element.appendChild(span);
}

function confirmBtn(element) {
    console.log("Confirm button getting listener attached."); 
    element.innerText = 'Confirm Order';
    element.addEventListener('click', function () {
        console.log("Confirm Order button clicked."); 

        
        if (!orderInformation || orderInformation.children.length === 0) {
            console.log("Cart is empty, cannot confirm order.");
            return; 
        }
        console.log("Proceeding to create popup..."); 

        

        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Dim background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Ensure it's on top */
            opacity: 0; /* Start hidden for fade-in */
            transition: opacity 0.3s ease;
        `;

        
        const popUp = document.createElement('div');
        popUp.style.cssText = `
            background-color: white;
            padding: 20px 25px; /* Reduced padding */
            border-radius: 10px;
            width: 380px; /* Width as before */
            max-width: 90%;
            font-family: 'RedHatText', sans-serif;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 15px; /* Reduced gap between sections */
            transform: scale(0.95);
            transition: transform 0.3s ease;
        `;

        
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.flexDirection = 'column';
        headerDiv.style.gap = '8px';

        const iconImg = document.createElement('img');
        
        iconImg.src = './assets/images/icon-order-confirmed.svg';
        iconImg.alt = 'Confirmed';
        iconImg.style.width = '32px'; 
        iconImg.style.height = '32px';
        iconImg.style.marginBottom = '5px'; 

        const title = document.createElement('h3');
        title.innerText = 'Order Confirmed';
        title.style.margin = '0';
        title.style.fontSize = '24px'; 
        title.style.fontWeight = 'bold'; 
        title.style.color = 'hsl(14, 65%, 9%)'; 

        const subTitle = document.createElement('p');
        subTitle.innerText = 'We hope you enjoy your food!';
        subTitle.style.margin = '0';
        subTitle.style.fontSize = '14px';
        subTitle.style.color = 'hsl(14, 25%, 72%)'; 

        headerDiv.appendChild(iconImg);
        headerDiv.appendChild(title);
        headerDiv.appendChild(subTitle);
        popUp.appendChild(headerDiv);

        
        const orderItemsContainer = document.createElement('div');
        orderItemsContainer.style.cssText = `
            background-color: hsl(30, 33%, 94%); /* Light beige background matching the image */
            padding: 20px; /* Padding around all content */
            border-radius: 8px;
            max-height: none; /* Dynamic height */
            overflow-y: visible; /* No scrollbar */
            display: flex;
            flex-direction: column;
            gap: 18px; /* Gap between items */
        `;

        const cartItems = orderInformation.querySelectorAll('.order-Info-main');
        let dynamicTotal = 0; 

        cartItems.forEach((cartItem, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px; /* Reduced padding */
                border-bottom: 1px solid hsl(14, 25%, 85%); /* Lighter separator */
                width: 100%;
            `;

            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px; /* Reduced space between image and text */
                width: 75%; /* Control width to ensure space for price */
                white-space: nowrap; /* Prevent text wrapping */
                overflow: hidden; /* Hide overflow */
                
            `;

            
            const itemName = cartItem.querySelector('.OrderName')?.innerText;
            let itemImageSrc = './assets/images/image-waffle-thumbnail.jpg'; 
            const productItemDiv = Array.from(item).find(div => div.querySelector('.info span')?.textContent === itemName);

            if (productItemDiv) {
                const imgElement = productItemDiv.querySelector('.img img');
                if (imgElement && imgElement.src) {
                    
                    const basePath = imgElement.src.substring(0, imgElement.src.lastIndexOf('-'));
                    const extension = imgElement.src.substring(imgElement.src.lastIndexOf('.'));
                    const potentialThumbnail = `${basePath}-thumbnail${extension}`;
                    
                    
                    itemImageSrc = potentialThumbnail;

                    
                    
                }
            }

            const itemImg = document.createElement('img');
            itemImg.src = itemImageSrc;
            itemImg.alt = itemName || 'Item';
            itemImg.style.width = '40px'; /* Smaller image */
            itemImg.style.height = '40px';
            itemImg.style.borderRadius = '4px';
            
            itemImg.onerror = () => { itemImg.src = './assets/images/image-waffle-thumbnail.jpg'; }; 

            const itemTextDiv = document.createElement('div');
            itemTextDiv.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 2px; /* Reduced gap */
                width: calc(100% - 45px); /* Account for image width + gap */
                overflow: hidden; /* Hide overflow */
            `;

            const itemNameP = document.createElement('p');
            itemNameP.innerText = itemName || 'Unknown Item';
            itemNameP.style.cssText = `
                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: hsl(14, 65%, 9%);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            `;

            const itemQuantityPriceP = document.createElement('p');
            const quantityText = cartItem.querySelector('.quantity')?.innerText || '1x';
            const unitPrice = cartItem.querySelector('.oneitemPrice')?.innerText.replace('@ ', '') || '$0.00';

            
            itemQuantityPriceP.innerHTML = `<span style="color: hsl(14, 86%, 42%); font-weight: bold;">${quantityText}</span> @ ${unitPrice}`;

            
            itemQuantityPriceP.style.cssText = `
                margin: 0;
                font-size: 12px;
                color: hsl(14, 25%, 72%);
                white-space: nowrap;
                overflow: hidden;
                display: flex;
                align-items: center;
                gap: 12px;
            `;

            itemTextDiv.appendChild(itemNameP);
            itemTextDiv.appendChild(itemQuantityPriceP);

            itemDetailsDiv.appendChild(itemImg);
            itemDetailsDiv.appendChild(itemTextDiv);

            const itemTotalPriceP = document.createElement('p');
            const priceText = cartItem.querySelector('.itemsPrice')?.innerText.replace('$', '').trim() || '0.00';
            const itemPrice = parseFloat(priceText);
            if (!isNaN(itemPrice)) {
                dynamicTotal += itemPrice; 
            }
            itemTotalPriceP.innerText = `$${itemPrice.toFixed(2)}`; 
            itemTotalPriceP.style.cssText = `
                margin: 0;
                font-size: 14px;
                font-weight: bold;
                color: hsl(14, 65%, 9%);
                text-align: right;
                white-space: nowrap;
            `;

            itemDiv.appendChild(itemDetailsDiv);
            itemDiv.appendChild(itemTotalPriceP);
            orderItemsContainer.appendChild(itemDiv);

            
            if (index === cartItems.length - 1) {
                itemDiv.style.borderBottom = 'none';
                itemDiv.style.paddingBottom = '0';
            }
        });

        
        const divider = document.createElement('div');
        divider.style.cssText = `
            height: 1px;
            width: 100%;
            background-color: hsl(30, 20%, 90%);
            margin: 8px 0 16px 0; /* Space around divider */
        `;
        orderItemsContainer.appendChild(divider);

        
        const totalDiv = document.createElement('div');
        totalDiv.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-top: 5px;
        `;

        const totalLabel = document.createElement('p');
        totalLabel.innerText = 'Order Total';
        totalLabel.style.cssText = `
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: hsl(14, 45%, 40%);
        `;

        const totalValue = document.createElement('p');
        totalValue.innerText = `$${dynamicTotal.toFixed(2)}`;
        totalValue.style.cssText = `
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: hsl(14, 45%, 15%);
        `;

        totalDiv.appendChild(totalLabel);
        totalDiv.appendChild(totalValue);

        
        orderItemsContainer.appendChild(totalDiv);

        
        popUp.appendChild(orderItemsContainer);

        
        const newOrderButton = document.createElement('button');
        newOrderButton.innerText = 'Start New Order';
        newOrderButton.style.cssText = `
            background-color: hsl(14, 86%, 42%);
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 25px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 12px;
            transition: background-color 0.2s ease;
        `;

        newOrderButton.addEventListener('mouseenter', () => newOrderButton.style.backgroundColor = 'hsl(14, 76%, 32%)'); 
        newOrderButton.addEventListener('mouseleave', () => newOrderButton.style.backgroundColor = 'hsl(14, 86%, 42%)');

        newOrderButton.addEventListener('click', function () {
            if (body.contains(overlay)) {
                body.removeChild(overlay);
            }

            // Reset all item borders
            const allImgContainers = document.querySelectorAll('.item .img');
            allImgContainers.forEach(container => {
                container.style = '';
            });

            totalItems = 0;
            cartItemNames = [];

            const cart = document.querySelector('.cart');
            if (cart) {
                const cartHeading = cart.querySelector('h2');
                if (cartHeading) {
                    cartHeading.innerText = 'Your Cart (0)';
                }
                
                cart.innerHTML = `
                    <h2>Your Cart (0)</h2>
                    <div class="content">
                        <img src="./assets/images/illustration-empty-cart.svg" alt="" style="width: 100px; margin-top: 1rem;">
                        <p>Your added items will appear here</p>
                    </div>
                `;

                cart.style.height = '240px'; 
            }

            const allButtons = document.querySelectorAll('.item button');
            allButtons.forEach(button => {
                const quantityControl = button.querySelector('div');
                if (quantityControl) {
                    button.removeChild(quantityControl);
                }

                button.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                button.style = ''; 
                button.disabled = false;

                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                newButton.addEventListener('click', handler);
            });

            orderInformation = null;
            contentCart = null;
        });

        popUp.appendChild(newOrderButton);

        
        overlay.appendChild(popUp);
        body.appendChild(overlay);

        
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            popUp.style.transform = 'scale(1)';
        });

        
    });
}

function OrderInfo(clickedBtn, name, price) {
    let existingOrderItem = null;
    if (orderInformation) {
        const existingItems = orderInformation.querySelectorAll('.order-Info-main');
        existingItems.forEach(item => {
            if (item.querySelector('.OrderName')?.innerText === name) {
                existingOrderItem = item;
            }
        });
    }

    if (existingOrderItem) {
        const quantitySpan = existingOrderItem.querySelector('.quantity');
        if (quantitySpan) {
            let currentQuantity = parseInt(quantitySpan.innerText);
            currentQuantity++;
            
            
            quantitySpan.innerText = `${currentQuantity}x`;

            
            const counterDisplay = clickedBtn.querySelector('div p');
            if (counterDisplay) {
                counterDisplay.innerText = currentQuantity;
            }

            const oneitemPriceSpan = existingOrderItem.querySelector('.oneitemPrice');
            const itemsPriceSpan = existingOrderItem.querySelector('.itemsPrice');
            if (oneitemPriceSpan && itemsPriceSpan) {
                const unitPrice = parseFloat(oneitemPriceSpan.innerText.replace('@ $', ''));
                itemsPriceSpan.innerText = ` $ ${(unitPrice * currentQuantity).toFixed(2)}`;
                updateCartTotal();
            }
        }
    } else {
        const orderInfoItems = document.createElement('div');
        const detail = document.createElement('div');
        const orderName = document.createElement('p');
        const quantity = document.createElement('span');
        const oneitemPrice = document.createElement('span');
        const itemsPrice = document.createElement('span');
        const btnClose = document.createElement('img');
        const divbtnClose = document.createElement('div');

        btnClose.setAttribute('src', './assets/images/icon-remove-item.svg');

        btnClose.addEventListener('mouseenter', function () {
            btnClose.setAttribute('src', './assets/images/remove-btn.svg');
        });
        btnClose.addEventListener('mouseleave', function () {
            btnClose.setAttribute('src', './assets/images/icon-remove-item.svg');
        });

        btnClose.addEventListener('click', function () {
            const itemToRemove = this.closest('.order-Info-main');
            if (itemToRemove) {
                const itemNameToRemove = itemToRemove.querySelector('.OrderName').innerText;
                const quantityToRemove = parseInt(itemToRemove.querySelector('.quantity').innerText.replace('x', ''));
                const relatedItemDiv = Array.from(item).find(div => div.querySelector('.info span').textContent === itemNameToRemove);
                
                // Reset the border of the removed item
                if (relatedItemDiv) {
                    const imgContainer = relatedItemDiv.querySelector('.img');
                    if (imgContainer) {
                        imgContainer.style = '';
                    }
                }

                itemToRemove.remove();
                
                totalItems -= quantityToRemove;
                const index = cartItemNames.indexOf(itemNameToRemove);
                if (index > -1) {
                    cartItemNames.splice(index, 1);
                }

                if (relatedItemDiv) {
                    const originalButton = relatedItemDiv.querySelector('button');
                    if (originalButton) {
                        const newButton = document.createElement('button');
                        newButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                        newButton.type = 'button';
                        
                        newButton.removeAttribute('style');
                        newButton.style = '';
                        newButton.disabled = false;
                        
                        originalButton.parentNode.replaceChild(newButton, originalButton);
                        
                        newButton.addEventListener('click', handler);
                    }
                }

                
                const remainingItems = orderInformation.querySelectorAll('.order-Info-main');
                if (remainingItems.length === 0) {
                    
                    const cart = document.querySelector('.cart');
                    if (cart) {
                        
                        cart.innerHTML = `
                            <h2>Your Cart (0)</h2>
                            <div class="content">
                                <img src="./assets/images/illustration-empty-cart.svg" alt="" style="width: 100px; margin-top: 1rem;">
                                <p>Your added items will appear here</p>
                            </div>
                        `;

                        
                        cart.style.height = '240px';
                        
                        
                        const content = cart.querySelector('.content');
                        if (content) {
                            content.style.cssText = `
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                            `;
                        }

                        
                        const allButtons = document.querySelectorAll('.item button');
                        allButtons.forEach(button => {
                            
                            const newButton = document.createElement('button');
                            newButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                            newButton.type = 'button';
                            newButton.removeAttribute('style');
                            newButton.disabled = false;
                            
                            
                            button.parentNode.replaceChild(newButton, button);
                            
                            
                            newButton.addEventListener('click', handler);
                        });

                        
                        totalItems = 0;
                        cartItemNames = [];
                        orderInformation = null;
                        contentCart = null;

                        
                        const listInfo1 = cart.querySelector('.list-info-1');
                        const listInfo2 = cart.querySelector('.list-info-2');
                        const btnConfirm = cart.querySelector('.btn-Confirm');
                        
                        if (listInfo1) listInfo1.remove();
                        if (listInfo2) listInfo2.remove();
                        if (btnConfirm) btnConfirm.remove();
                    }
                } else {
                    
                    updateDisplay();
                    updateCartTotal();
                    updateCartHeight();
                }
            }
        });

        orderName.classList.add('OrderName');
        quantity.classList.add('quantity');
        oneitemPrice.classList.add('oneitemPrice');
        itemsPrice.classList.add('itemsPrice');
        detail.classList.add('detail');
        btnClose.classList.add('btn-close');
        divbtnClose.classList.add('divbtnClose');

        orderName.innerText = name;
        quantity.innerText = '1x';
        oneitemPrice.innerText = `@ $${parseFloat(price).toFixed(2)}`;
        itemsPrice.innerText = ` $${parseFloat(price).toFixed(2)}`;

        orderInfoItems.classList.add('order-Info-main');

        if (orderInformation) {
            orderInformation.appendChild(orderInfoItems);
            if (orderInformation) {
                orderInformation.appendChild(orderInfoItems);
                orderInfoItems.append(orderName);
                orderInfoItems.appendChild(divbtnClose);
                divbtnClose.appendChild(btnClose);
                orderInfoItems.append(detail);
                detail.appendChild(quantity);
                detail.appendChild(oneitemPrice);
                detail.appendChild(itemsPrice);
                updateCartTotal();

                
                updateCartHeight();
            }

            orderInfoItems.append(orderName);
            orderInfoItems.appendChild(divbtnClose);
            divbtnClose.appendChild(btnClose);
            orderInfoItems.append(detail);
            detail.appendChild(quantity);
            detail.appendChild(oneitemPrice);
            detail.appendChild(itemsPrice);
            updateCartTotal();
            if (!cartItemNames.includes(name)) {
                cartItemNames.push(name);
                updateDisplay();
            }
        } else {
            console.error('Order information container not initialized.');
        }
    }
}

function updateCartHeight() {
    const cart = document.querySelector('.cart');
    const orderInfoItems = document.querySelectorAll('.order-Info-main');
    const baseHeight = 240; 
    const additionalHeightPerItem = 80; 

    if (orderInfoItems.length === 0) {
        
        cart.style.height = `${baseHeight}px`;

        
        const cartHeading = cart.querySelector('h2');
        const contentDiv = cart.querySelector('.content');
        const cartTextElement = contentDiv?.querySelector('p');

        
        if (cartHeading) {
            cartHeading.innerText = 'Your Cart (0)';
        }

        
        if (contentDiv) {
            contentDiv.innerHTML = `
                <img src="./assets/images/illustration-empty-cart.svg" alt="" style="width: 100px; margin-top: 1rem;">
                <p>Your added items will appear here</p>
            `;
            contentDiv.classList.remove('content-cart');
        }

        
        const allButtons = document.querySelectorAll('.item button');
        allButtons.forEach(button => {
            
            const newButton = document.createElement('button');

            
            Array.from(button.attributes).forEach(attr => {
                newButton.setAttribute(attr.name, attr.value);
            });

            
            newButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';

            
            newButton.style = '';

            
            button.parentNode.replaceChild(newButton, button);

            
            newButton.addEventListener('click', handler);
        });

        
        if (orderInformation) {
            orderInformation.innerHTML = '';
        }
    } else {
        
        const newHeight = baseHeight + (orderInfoItems.length * additionalHeightPerItem);
        cart.style.height = `${newHeight}px`;
    }
}


function removeItem(element, itemName) {
    
    let cartItem;
    if (element.classList.contains('order-Info-main')) {
        cartItem = element;
    } else {
        cartItem = Array.from(orderInformation.querySelectorAll('.order-Info-main'))
            .find(item => item.querySelector('.OrderName').innerText === itemName);
    }
    
    if (cartItem) {
        
        const quantityToRemove = parseInt(cartItem.querySelector('.quantity').innerText.replace('x', ''));
        
        
        cartItem.remove();
        
        
        totalItems -= quantityToRemove;
        
        
        const itemDiv = Array.from(document.querySelectorAll('.item')).find(item =>
            item.querySelector('.info span').textContent === itemName
        );
        
        if (itemDiv) {
            const imgContainer = itemDiv.querySelector('.img');
            if (imgContainer) {
                imgContainer.style.border = 'none';
            }

            const button = itemDiv.querySelector('button');
            if (button) {
                
                const newButton = document.createElement('button');
                newButton.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                newButton.type = 'button';
                newButton.removeAttribute('style');
                newButton.disabled = false;
                
                
                button.parentNode.replaceChild(newButton, button);
                
                
                newButton.addEventListener('click', handler);
            }
        }
        
        
        const index = cartItemNames.indexOf(itemName);
        if (index > -1) {
            cartItemNames.splice(index, 1);
        }
        
        updateCartTotal();
        updateDisplay();
        
        
        if (orderInformation && orderInformation.children.length === 0) {
            resetCartToInitialState();
        }
    }
}

function resetAllButtons() {
    const allButtons = document.querySelectorAll('.item button');
    allButtons.forEach(button => {
        const itemDiv = button.closest('.item');
        const imgContainer = itemDiv.querySelector('.img');
        if (imgContainer) {
            imgContainer.style.border = 'none';
        }

        const quantityControl = button.querySelector('div');
        if (quantityControl) {
            button.removeChild(quantityControl);
        }

        button.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
        button.style = ''; 
        button.disabled = false;

        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', handler);
    });
}


function resetCartToInitialState() {
    totalItems = 0;
    cartItemNames = [];

    const cartHeading = document.querySelector('.cart h2');
    if (cartHeading) {
        cartHeading.innerText = 'Your Cart (0)';
    }

    // Reset all item borders
    const allImgContainers = document.querySelectorAll('.item .img');
    allImgContainers.forEach(container => {
        container.style = '';
    });

    const cart = document.querySelector('.cart');
    if (cart) {
        cart.style.height = 'auto';

        cart.innerHTML = `
            <h2>Your Cart (0)</h2>
            <div class="content">
                <img src="./assets/images/illustration-empty-cart.svg" alt="" style="width: 100px; margin-top: 1rem;">
                <p>Your added items will appear here</p>
            </div>
        `;

        const content = cart.querySelector('.content');
        if (content) {
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.justifyContent = 'center';
            content.style.alignItems = 'center';
        }
    }

    resetAllButtons();

    orderInformation = null;
    contentCart = null;
}

window.addEventListener('DOMContentLoaded', initializeButtons);
