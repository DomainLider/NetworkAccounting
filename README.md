# Network Accounting Microservice

* Microservice for allocate IPV4 networks *

This microservice features:
1. Add network network pool type
1. Modify network pool type
1. Add free IPV4 network to pool
1. Get free network for pool type with splitting are required
1. Lease network 
1. Release network 
1. Keep tree network - parent and childs
1. Planned - defragmentation networks 

Language and frameworks:
1. Backend .NET Core 2.1
1. Frontend Antd (React+Redux+DVA+UMI)

Install and run project:
1. Install .NET CORE runtime
1. Cd <project dir>\NetworkAccounting.Web
1. Run from console for restore package dependencies: 
    `dotnet restore`
1. Cd <project dir>\NetworkAccounting.Web\wwwroot\ClientApp
1. Run for restore dependencies `yarn install`
1. Run for build web client `yarn run start` . No waiting for close!. Open new console
1. In new console return to <project dir>\NetworkAccounting.Web
1. Run application `dotnet run`
1. Welcome to my project!