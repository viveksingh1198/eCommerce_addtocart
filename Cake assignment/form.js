const formEle = document.querySelector('.form');
if(formEle){
formEle.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formEle);
    const new_data = Object.fromEntries(formData);

    // Get the image file
    const imageFile = formData.get('image');

    // Check if an image is selected
    if (imageFile) {
        // Read the image file as a Data URL
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            // Store the base64-encoded image data along with other form data
            new_data.image = reader.result;

            // Check if localStorage already has data for this Cname
            let storedData = localStorage.getItem(new_data.Cname);

            if (storedData) {
                // Parse existing data
                storedData = JSON.parse(storedData);
            } else {
                // Initialize with an empty array if no data exists
                storedData = [];
            }

            // Add new data to the existing array
            storedData.push(new_data);

            // Store the updated data back to localStorage
            localStorage.setItem(new_data.Cname, JSON.stringify(storedData));
        };
    } else {
        console.log('No image file selected.');
    }

});

}