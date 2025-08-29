
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@repo/ui";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shadcn Cards Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This is a simple card component using Shadcn UI.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Action
            </button>
          </CardFooter>
        </Card>
        {/* Card 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Cards are useful for displaying grouped content.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Learn More
            </button>
          </CardFooter>
        </Card>
        {/* Card 3 */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You can customize cards with different colors and actions.
            </p>
          </CardContent>
          <CardFooter>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Details
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;
