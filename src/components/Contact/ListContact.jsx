import ItemContactComponent from "./ItemContact";

export default function ListContactComponent({ listContact }) {
  const renderContact = () => {
    return listContact.map((contact, index) => {
      return <ItemContactComponent key={index} contact={contact} />;
    });
  };
  return <>{renderContact()}</>;
}
