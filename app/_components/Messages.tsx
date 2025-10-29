import MessageBox from "./MessageBox";

export default function Messages() {
  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      <MessageBox
        message="Hey, I need help with the project"
        timestamp="12:59 PM"
        isSent={false}
      />
      <MessageBox
        message="Sure! What do you need?"
        timestamp="1:09 PM"
        isSent={true}
      />
    </div>
  );
}
