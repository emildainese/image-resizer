export const togglerHandler = (toggler) => {
  const childView =
    toggler.parentElement.parentElement.querySelector('.nested');
  if (childView) childView.classList.toggle('show');
  toggler.parentElement.classList.toggle('active');
  toggler.classList.toggle('fa-folder-open');
};

export const lineOnlyForRootsNode = () => {
  const uls = document.querySelectorAll('ul.nested');
  Array.from(uls).forEach((ul) => {
    const liArray = Array.from(ul.querySelectorAll('li'));
    if (liArray.every((li) => li.classList.contains('list-group-item'))) {
      liArray.forEach((li) => {
        const line = li.querySelector('.line');
        line.style.display = 'none';
      });
    }
  });
};

export const hasChildren = (node) => {
  return node.children && node.children.length;
};

export const hasRootChild = (node) => {
  return (
    hasChildren(node) && node.children.some((child) => child.type === 'root')
  );
};
