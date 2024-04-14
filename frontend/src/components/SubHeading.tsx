interface Prop {
    title: string
}

const SubHeading: React.FC<Prop> = ({title}) => {
  return (
    <div className="md:my-2 text-sm md:text-lg mb-4 md:mb-8 text-gray-500 text-center">{title}</div>
  )
}

export default SubHeading