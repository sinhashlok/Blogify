interface Prop {
    title: string
}

const SubHeading: React.FC<Prop> = ({title}) => {
  return (
    <div className="my-2 mb-8 text-gray-500 text-center">{title}</div>
  )
}

export default SubHeading