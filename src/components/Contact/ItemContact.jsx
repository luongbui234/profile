export default function ItemContactComponent({ contact }) {
  return (
    <div className="flex items-center gap-5">
      {contact.icon}
      <p>{contact.content}</p>
    </div>
  );
}
