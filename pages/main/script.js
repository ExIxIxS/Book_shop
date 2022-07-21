const createHeader = function() {
    let header = document.createElement('header');
    let title = document.createElement('h1');
    let logo = document.createElement('a');
    let slogan = document.createElement('p');
    header.className = 'header';
    title.innerHTML = "Book Mood";
    title.hidden = true;
    logo.className = 'logo-title';
    logo.href = '';
    logo.innerHTML = '<div><p>b</p><p>m</p></div><div class="logo-title-central"><p>OO</p></div><div><p>k</p><p>d</p></div>';
    slogan.className = 'slogan';
    slogan.innerHTML = '“Think before you speak. Read before you think.”'
    header.append(title, logo, slogan);
    return header;
}

const createCatalogePage = function() {
    let catalogePage = document.createElement('div');
    catalogePage.className = 'container_centered';
    catalogePage.append(createHeader());
    return catalogePage;
}

document.body.prepend(createCatalogePage());

/*



*/