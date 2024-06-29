![Adocasts](https://github.com/adocasts/.github/blob/main/assets/brand-banner-rounded.png?raw=true)
# Three Approaches for Organizing your AdonisJS Business Logic Operations

This codebase highlights three different approaches you can use to organize your AdonisJS business logic operations.

1. [Fat Controllers](https://github.com/adocasts/controllers-services-actions/tree/01_Fat_Controllers)
   1. Controllers contain all tasks needed to complete an operation
   2. Repetitive tasks may be extracted into a service for reusability as needed
2. [Services](https://github.com/adocasts/controllers-services-actions/tree/02_Services)
   1. Controllers are in charge of validating the request & returning the response
   2. The core operational tasks of the request is done within a service method
   3. The service method may call additional service methods as sub-tasks to complete the operation
   4. Multiple actions are grouped within a single service class, often by resource
3. [Actions](https://github.com/adocasts/controllers-services-actions/tree/03_Actions)
   1. Controllers are in charge of validating the request & returning the response
   2. The core operational tasks of the request is done within an action class
   3. The action class may contain several methods, as needed, to complete the single action it's meant to handle
   4. Unlike services, each action has it's own class. Each action class may be housed within nested folders, as needed, and usually at least nested within a resource folder


[Want to learn more? Check out our lesson where we discuss each of these three approaches](https://adocasts.com/lessons/three-approaches-for-organizing-your-adonisjs-business-logic-operations)

[![YouTube Badge](https://img.shields.io/youtube/channel/subscribers/UCTEKX3KQAJi7_0-_rSz0Edg?logo=YouTube&style=for-the-badge)](https://youtube.com/adocasts)
[![Twitter Badge](https://img.shields.io/twitter/follow/adocasts?logo=twitter&logoColor=white&style=for-the-badge)](https://twitter.com/adocasts)
[![Twitch Badge](https://img.shields.io/twitch/status/adocasts?logo=twitch&logoColor=white&style=for-the-badge)](https://twitch.tv/adocasts)
