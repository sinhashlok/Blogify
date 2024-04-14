interface Prop {
    title: string
}

const Heading: React.FC<Prop> = ({title}) => {
  return (
    <div className="text-2xl md:text-4xl font-bold text-center">{title}</div>
  )
}

export default Heading