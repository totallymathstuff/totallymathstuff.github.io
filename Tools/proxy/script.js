const urlInput = document.getElementById('url-input');
const unblockButton = document.getElementById('unblock-button');
const generateDataURLButton = document.getElementById('generate-data-url-button');
const dataURLOutput = document.getElementById('data-url-output');
const copyDataURLButton = document.getElementById('copy-data-url-button');
const copyMessage = document.getElementById('copy-message');

function unblockWebsite(url) {
    try {
        let validatedUrl;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            validatedUrl = "https://" + url;
        } else {
          validatedUrl = url;
        }

        const blob = new Blob([`<html><body style='margin:0;padding:0;'><iframe src='${validatedUrl}' width='100%' height='100%' style='border:none;'></iframe></body></html>`], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');

    } catch (error) {
        console.error("Error unblocking website:", error);
        alert("Invalid URL or unable to load website.");
    }
}

function generateDataURL(url) {
    try {
        let validatedUrl;
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            validatedUrl = "https://" + url;
        } else {
          validatedUrl = url;
        }
        const dataURL = `data:text/html;charset=utf-8,<script>const u=URL.createObjectURL(new Blob([\`<html><body style='margin:0;padding:0;'><iframe src='${validatedUrl}' width='100%' height='100%' style='border:none;'></iframe></body></html>\`], { type: 'text/html' }));window.location.href=u;</script>`;
        dataURLOutput.value = dataURL;
    } catch (error) {
        console.error("Error generating data URL:", error);
        alert("Invalid URL.");
    }
}

urlInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        unblockWebsite(this.value);
    }
});

unblockButton.addEventListener('click', function () {
    unblockWebsite(urlInput.value);
});

generateDataURLButton.addEventListener('click', function () {
    generateDataURL(urlInput.value);
});

copyDataURLButton.addEventListener('click', function () {
    const dataURL = dataURLOutput.value;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(dataURL)
            .then(() => {
                console.log('URL copied to clipboard:', dataURL); // Log the URL
                showCopyMessage();
            })
            .catch((error) => {
                console.error('Error copying URL:', error);
                alert("Copy to clipboard failed. Please copy manually.");
            });
    } else {
        console.log('Clipboard API not supported. Using fallback.'); // Log the fallback
        dataURLOutput.select();
        document.execCommand('copy');
        alert("Your browser does not support automatic copy. Please copy manually.");
    }
});

function showCopyMessage() {
    copyMessage.classList.add('show');

    setTimeout(() => {
        copyMessage.classList.remove('show');
    }, 2000);
}
