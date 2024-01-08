export default function ScrollTop(component: string) {
  const ScrollComponent = document.getElementById(component);
  if (ScrollComponent) {
    ScrollComponent.scrollTop = 0;
  }
}
