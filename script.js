const menuItems = {
    comida: [
        { 
            name: "Pizza Margherita", 
            price: 25.00, 
            description: "Uma deliciosa pizza feita com molho de tomate fresco, queijo mozzarella e folhas de manjericão.", 
            image: "https://s2-receitas.glbimg.com/wb7DIMyCpEyV07sTAtcDWD8HQjw=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/h/r/EfCbvqTbeDRAD3Lzc5xA/pizza-margherita.jpg" 
        },
        { 
            name: "Hambúrguer", 
            price: 20.00, 
            description: "Suculento hambúrguer de carne bovina com queijo cheddar, alface crocante e tomate fresco.", 
            image: "https://www.plasutil.com.br/wp-content/uploads/2022/04/Hamburguer.jpg" 
        },
        { 
            name: "Salada Caesar", 
            price: 15.00, 
            description: "Uma salada fresca com frango grelhado, croutons crocantes e um molho Caesar cremoso.", 
            image: "https://static.itdg.com.br/images/1200-630/f6acb58cd0215a6d2118c4a87ebab1fe/153730-original.jpg" 
        },
        { 
            name: "Tacos", 
            price: 18.00, 
            description: "Tacos recheados com carne temperada, queijo derretido e guacamole cremoso.", 
            image: "https://static.itdg.com.br/images/1200-630/7e7c9a4efc1c57f768dc1314c11262d1/350394-original.jpg" 
        },
        { 
            name: "Hotdog", 
            price: 20.00, 
            description: "Clássico cachorro-quente com salsicha suculenta, molho e cebola picada.", 
            image: "https://i.em.com.br/FLy4n531zomjJWrqfbw3SxMJOzc=/790x/smart/imgsapp.em.com.br/app/noticia_127983242361/2021/06/13/1275522/20210610165424653845e.jpg" 
        },
        { 
            name: "Sushi", 
            price: 30.00, 
            description: "Deliciosos sushis variados, preparados com peixe fresco e arroz temperado.", 
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVbyVV6d5ZiUfVVD8-0jXsuw6Bn3mWZ1H_w&s" 
        }
    ],
    sobremesa: [
        { 
            name: "Pudim", 
            price: 12.00, 
            description: "Pudim de leite condensado cremoso, uma sobremesa clássica e irresistível.", 
            image: "https://static.itdg.com.br/images/360-240/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-1-.jpg" 
        },
        { 
            name: "trufa de brigadeiro", 
            price: 12.00, 
            description: "Curto muito não", 
            image: "https://shoppr.com.br/cdn/shop/articles/Imagem1_52bc43c5-7c19-4043-88d6-5d0a297352f5_2048x.jpg?v=1712102635" 
        },
        { 
            name: "Mousse de maracujá", 
            price: 12.00, 
            description: "Bom demais ta maluco é", 
            image: "https://www.sweetpoint.com.br/wp-content/uploads/2017/12/mouse-maracuja.png" 
        },

    ],
    bebida: [
        { 
            name: "Café", 
            price: 10.00, 
            description: "Café fresco e aromático, perfeito para começar o dia.", 
            image: "https://forbes.com.br/wp-content/uploads/2021/08/agro-cafe%CC%81-160821-Wenderson-Araujo_Trilux_CNA.jpg" 
        },
        { 
            name: "Água Mineral", 
            price: 5.00, 
            description: "Água mineral refrescante, ideal para acompanhar sua refeição.", 
            image: "https://io.convertiez.com.br/m/trimais/shop/products/images/3174/medium/agua-mineral-natural-sem-gas-crystal-garrafa-500ml_3146.jpg" 
        }
    ]
};

let cart = [];

function displayMenu(items) {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    Object.keys(items).forEach(category => {
        if (items[category].length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            const categoryHeader = document.createElement('h2');
            categoryHeader.innerText = category.charAt(0).toUpperCase() + category.slice(1);
            categoryDiv.appendChild(categoryHeader);

            items[category].forEach(item => {
                const dishDiv = document.createElement('div');
                dishDiv.className = 'dish';
                dishDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="dish-image">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Preço: R$ ${item.price.toFixed(2)}</p>
                    <button onclick="addToCart('${item.name}')">Adicionar à Sacola</button>
                `;
                categoryDiv.appendChild(dishDiv);
            });

            menuDiv.appendChild(categoryDiv);
        }
    });
}

function filterByCategory() {
    const selectedCategory = document.getElementById('category-select').value;

    if (selectedCategory) {
        displayMenu({ [selectedCategory]: menuItems[selectedCategory] });
    } else {
        displayMenu(menuItems);
    }
}

function addToCart(name) {
    const item = Object.values(menuItems).flat().find(d => d.name === name);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)} 
            <span class="remove-button" onclick="removeFromCart(${index})">🗑️</span>
        `;
        cartItemsDiv.appendChild(li);
        total += item.price;
    });

    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function filterMenu() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredItems = Object.values(menuItems).flat().filter(item => item.name.toLowerCase().includes(searchValue));
    displayFilteredMenu(filteredItems);
}

function displayFilteredMenu(filteredItems) {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';

    filteredItems.forEach(item => {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish';
        dishDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="dish-image">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
            <button onclick="addToCart('${item.name}')">Adicionar à Sacola</button>
        `;
        menuDiv.appendChild(dishDiv);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    displayMenu(menuItems);

    // Adiciona evento de clique ao botão de finalizar pedido
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.onclick = () => {
        if (cart.length > 0) {
            alert(`Pedido finalizado! Total: R$ ${document.getElementById('total').innerText.split(' ')[1]}`);
            cart = [];
            updateCart();
            // Adicione esta linha
        } else {
            alert('Sua sacola está vazia!');
        }
    };
    
});
