import { Text } from '@/components/ui/Text'

export default function Home() {
  return (
    <div className="bg-background h-screen flex flex-col gap-8">
      <div className="justify-start p-4 text-text">
        <Text
          as="h1"
          size="t1"
        >
          Title Large
        </Text>
        <Text
          as="h2"
          size="t2"
        >
          Title Medium
        </Text>
        <Text
          as="h2"
          size="t3"
        >
          Title Regular
        </Text>
        <Text
          as="span"
          size="body"
        >
          Fonte Body
        </Text>
        <Text
          as="p"
          size="cap1"
        >
          Fonte Caption
        </Text>
        <Text
          as="p"
          size="cap2"
        >
          Fonte Caption 2
        </Text>
        <Text
          as="h3"
          size="sub"
        >
          Fonte Subtitle
        </Text>
        <Text
          as="span"
          size="notes"
        >
          Fonte Notes
        </Text>
      </div>

      <div className="flex gap-4 flex-wrap justify-start p-4 text-text text-center">
        <div className="w-20 h-20 border-2 border-text bg-text flex justify-center items-center">
          <Text
            as="p"
            size="notes"
            className="text-background"
          >
            Text
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-background flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Background
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-grey-1 flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Grey-1
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-grey-2 flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Grey-2
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-primary flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Primary
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-secondary flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Secondary
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-support-orange flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Suport Orange
          </Text>
        </div>
        <div className="w-20 h-20 border-2 border-text bg-support-blue flex justify-center items-center p-2">
          <Text
            as="p"
            size="notes"
            className="text-text"
          >
            Suport Blue
          </Text>
        </div>
      </div>
    </div>
  )
}
