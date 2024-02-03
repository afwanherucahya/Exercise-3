document.addEventListener("DOMContentLoaded", function () {
  // Fetch portfolio data and render on page load
  fetchDataAndRender();

  // Add event listener for Add Portfolio button
  document.getElementById("add-btn").addEventListener("click", function () {
    // Show the modal
    const addPortfolioModal = new bootstrap.Modal(document.getElementById("modal-add"));
    addPortfolioModal.show();
  });

  // Add event listener for Add Portfolio button inside the modal
  document.getElementById("add-portfolio-btn").addEventListener("click", function () {
    // Get input values
    const image = document.getElementById("add-portfolio-image").value;
    const description = document.getElementById("add-portfolio-description").value;
    const url = document.getElementById("add-portfolio-url").value;

    // Add new portfolio to the existing data
    const newPortfolio = {
      image: image,
      description: description,
      url: url
    };

    // Fetch existing data
    fetch("/data/data-portofolio.json")
      .then(response => response.json())
      .then(data => {
        // Add the new portfolio to the existing data
        data.push(newPortfolio);

        // Save data to JSON file
        saveDataToJSON(data);

        // Fetch and render updated data
        fetchDataAndRender();

        // Clear the form fields
        document.getElementById("add-portfolio-image").value = "";
        document.getElementById("add-portfolio-description").value = "";
        document.getElementById("add-portfolio-url").value = "";

        // Close the modal
        const addPortfolioModal = new bootstrap.Modal(document.getElementById("modal-add"));
        addPortfolioModal.hide();
      });
  });

  function fetchDataAndRender() {
    // Fetch portfolio data and render on page load
    fetch("/data/data-portofolio.json") // Replace with your JSON file URL
      .then(response => response.json())
      .then(data => renderPortfolio(data));
  }

  function renderPortfolio(data) {
    // Clear existing items
    const portfolioContainer = document.querySelector("#portofolio .row");

    // Loop through data and render each portfolio item
    data.forEach(portfolioItem => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("col-md-3", "mb-3");

      const cardInnerDiv = document.createElement("div");
      cardInnerDiv.classList.add("card");

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-img-top");
      cardImage.src = portfolioItem.image;
      cardImage.alt = "Portfolio Image";

      // Menambahkan class "img-fluid" untuk membuat gambar responsif
      cardImage.classList.add("img-fluid");

      // Menambahkan style untuk membatasi lebar gambar
      cardImage.style.maxWidth = "100%";
      cardImage.style.height = "auto"; // Memastikan aspek ratio tetap

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardDescription = document.createElement("p");
      cardDescription.classList.add("card-text");
      cardDescription.textContent = portfolioItem.description;

      const cardLink = document.createElement("a");
      cardLink.classList.add("card-link", "text-primary");
      cardLink.href = portfolioItem.url;
      cardLink.textContent = "Link";

      const cardEdit = document.createElement("a");
      cardEdit.classList.add("card-link", "text-warning");
      cardEdit.href = "#"; // Add your edit logic here
      cardEdit.textContent = "Edit";

      const cardDelete = document.createElement("a");
      cardDelete.classList.add("card-link", "text-danger");
      cardDelete.href = "#";
      cardDelete.textContent = "Delete";

      // Add event listener for Delete Portfolio button
      cardDelete.addEventListener("click", function () {
        // Find the index of the portfolio item to be deleted
        const indexToDelete = data.findIndex(item => item.description === portfolioItem.description);

        if (indexToDelete !== -1) {
          // Remove the portfolio item from the data array
          data.splice(indexToDelete, 1);

          // Save the updated data to the JSON file
          saveDataToJSON(data);

          // Fetch and render updated data
          fetchDataAndRender();
        }
      });

      cardBody.appendChild(cardDescription);
      cardBody.appendChild(cardLink);
      cardBody.appendChild(cardEdit);
      cardBody.appendChild(cardDelete);

      cardInnerDiv.appendChild(cardImage);
      cardInnerDiv.appendChild(cardBody);

      cardDiv.appendChild(cardInnerDiv);
      portfolioContainer.appendChild(cardDiv);
    });
  }

  function saveDataToJSON(data) {
    // Implement your logic to save data to the JSON file or database
    // This function will depend on your server-side or backend implementation
    // You may use fetch() or other AJAX methods to send data to the server
    // For debugging purposes, log the new data to the console
    console.log("Saving to JSON:", data);
  }
});
