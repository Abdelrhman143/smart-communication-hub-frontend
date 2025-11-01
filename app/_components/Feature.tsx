// Feature card component - Displays individual feature with icon, heading, and description

type Props = {
  heading: string;
  descreption: string;
  icon: React.ReactNode;
};

export default function Feature({ feature }: { feature: Props }) {
  return (
    <div className="bg-white p-5 border-2 shadow-lg rounded-2xl  border-gray-50 hover:border-MainColor transition">
      {feature.icon}
      <h3 className="mt-2 font-semibold text-xl">{feature.heading}</h3>
      <p className="mt-3 text-gray-500 max-w-65">{feature.descreption}</p>
    </div>
  );
}
